import { CreateOrderDTO } from "./CreateOrderDTO";
import { OrderException } from "../../exceptions/OrderException";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IClientRepository } from "../../repositories/IClientRepository";
import { IProductRepository } from "../../repositories/IProductRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { IOrderProductRepository } from "../../repositories/IOrderProductRepository";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";
import { OrderProductException } from "../../exceptions/OrderProductException";
import { 
  DateTime, 
  EmployeeType, 
  Order, 
  OrderProduct, 
  Product, 
  ProductBrand, 
  ProductName, 
  ProductPrice, 
  ProductQuantity, 
  Result, 
  UniqueEntityId 
} from "../../../domain";
import { ValidationException } from "../../exceptions/ValidationException";
import { ProductException } from "../../exceptions/ProductException";
import { DeliveryState } from "../../../domain/DeliveryState";

type Response = Promise<Order>;

interface CreateOrderUseCaseDeps {
  orderRepository: IOrderRepository;
  clientRepository: IClientRepository;
  productRepository: IProductRepository,
  employeeTokenService: IEmployeeTokenService;
  orderProductRepository: IOrderProductRepository;
}

export class CreateOrderUseCase {
  protected readonly orderRepository: IOrderRepository;
  protected readonly clientRepository: IClientRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;
  protected readonly productRepository: IProductRepository;
  protected readonly orderProductRepository: IOrderProductRepository;

  public constructor({
    orderRepository, 
    clientRepository,
    employeeTokenService,
    productRepository,
    orderProductRepository
  }: CreateOrderUseCaseDeps) {
    this.orderRepository = orderRepository;
    this.clientRepository = clientRepository;
    this.employeeTokenService = employeeTokenService;
    this.productRepository = productRepository;
    this.orderProductRepository = orderProductRepository;
  }
  
  public execute = async (req: CreateOrderDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN || 
      decodedEmployee.type === EmployeeType.VENDOR)) {
      throw new EmployeeActionNoAllowedException();
    }
    
    const orderId = UniqueEntityId.create().value;

    let total = 0;

    for(let reqProduct of req.products) {
      const product = await this.productRepository.findOne({id: reqProduct.productId});
      const productFound = !!product;

      if(productFound) {
        const nameOrError = ProductName.create(product.name);
        const brandOrError = ProductBrand.create(product.brand);
        const quantityOrError = ProductQuantity.create(reqProduct.quantity);
        const priceOrError = ProductPrice.create(product.price);
        const orderProductOrError = OrderProduct.create({
          orderId: orderId,
          productId: product.id,
          name: nameOrError.getValue(),
          brand: brandOrError.getValue(),
          quantity: quantityOrError.getValue(),
          price: priceOrError.getValue(),
          imageURL: product.imageURL,
          description: product.description,
          grammage: product.grammage  
        });

        if(orderProductOrError.isFailure) {
          throw new OrderProductException(orderProductOrError.getError() as string);
        }

        const orderProduct = orderProductOrError.getValue();

        await this.orderProductRepository.save(orderProduct);

        total += (orderProduct.price * reqProduct.quantity);
      }
    }

    const createdAtOrError = DateTime.create(DateTime.current());
    const deliveryState = DeliveryState.create(DeliveryState.NO_DELIVERED);
    const orderOrError = Order.create({
      employeeId: decodedEmployee.id,
      clientId: req.clientId,
      createdAt: createdAtOrError.getValue(),
      deliveryState: deliveryState.getValue(),
      total: total
    }, orderId);

    if(orderOrError.isFailure) {
      throw new OrderException(orderOrError.getError() as string);
    }

    const order = orderOrError.getValue();

    await this.orderRepository.save(order);

    for(let reqProduct of req.products) {
      const product = await this.productRepository.findOne({id: reqProduct.productId});
      const productFound = !!product;

      if(productFound) {
        const nameOrError = ProductName.create(product.name);
        const brandOrError = ProductBrand.create(product.brand);
        const avaliableQuantityOrError = ProductQuantity.create(product.avaliableQuantity - reqProduct.quantity);
        const priceOrError = ProductPrice.create(product.price);
        const combinedResult = Result.combine([
          nameOrError,
          brandOrError,
          avaliableQuantityOrError,
          priceOrError
        ]);

        if(combinedResult.isFailure) {
          throw new ValidationException(combinedResult.getError() as string);
        }

        const updatedProductOrError = Product.create({
          name: nameOrError.getValue(),
          brand: brandOrError.getValue(),
          avaliableQuantity: avaliableQuantityOrError.getValue(),
          price: priceOrError.getValue(),
          imageURL: product.imageURL,
          description: product.description,
          grammage: product.grammage
        }, product.id);
    
        if(updatedProductOrError.isFailure) {
          throw new ProductException(updatedProductOrError.getError() as string);
        }
    
        const updatedProduct = updatedProductOrError.getValue();
    
        await this.productRepository.save(updatedProduct);        
      }
    }

    return order;
  }
}
