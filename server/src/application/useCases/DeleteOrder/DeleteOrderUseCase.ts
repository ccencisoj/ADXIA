import { EmployeeType, Product, ProductBrand, ProductName, ProductPrice, ProductQuantity, Result } from "../../../domain";
import { DeleteOrderDTO } from "./DeleteOrderDTO";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IClientRepository } from "../../repositories/IClientRepository";
import { OrderNoFoundException } from "../../exceptions/OrderNoFoundException";
import { ClientNoFoundException } from "../../exceptions/ClientNoFoundException";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";
import { IOrderProductRepository } from "../../repositories/IOrderProductRepository";
import { IProductRepository } from "../../repositories/IProductRepository";
import { ValidationException } from "../../exceptions/ValidationException";
import { ProductException } from "../../exceptions/ProductException";

type Response = Promise<void>;

interface DeleteOrderUseCaseDeps {
  clientRepository: IClientRepository;
  orderRepository: IOrderRepository;
  productRepository: IProductRepository;
  employeeTokenService: IEmployeeTokenService;
  orderProductRepository: IOrderProductRepository;
}

export class DeleteOrderUseCase {
  protected readonly clientRepository: IClientRepository;
  protected readonly orderRepository: IOrderRepository;
  protected readonly productRepository: IProductRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;
  protected readonly orderProductRepository: IOrderProductRepository;

  public constructor({
    clientRepository, 
    orderRepository,
    employeeTokenService,
    productRepository,
    orderProductRepository
  }: DeleteOrderUseCaseDeps) {
    this.clientRepository = clientRepository;
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.employeeTokenService = employeeTokenService;
    this.orderProductRepository = orderProductRepository;
  }

  public execute = async (req: DeleteOrderDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN ||
      decodedEmployee.type === EmployeeType.VENDOR)) {
      throw new EmployeeActionNoAllowedException();
    }

    const order = await this.orderRepository.findOne({id: req.orderId});
    const orderFound = !!order;

    if(!orderFound) {
      throw new OrderNoFoundException();
    }

    await this.orderRepository.delete(order);

    const orderProducts = await this.orderProductRepository.findMany({orderId: order.id});

    for(let orderProduct of orderProducts) {
      const product = await this.productRepository.findOne({id: orderProduct.productId});
      const productFound = !!product;

      if(productFound) {
        const nameOrError = ProductName.create(product.name);
        const brandOrError = ProductBrand.create(product.brand);
        const avaliableQuantityOrError = ProductQuantity.create(product.avaliableQuantity + orderProduct.quantity);
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
    
        await this.orderProductRepository.delete(orderProduct);
        
        await this.productRepository.save(updatedProduct);
      }
    }
  }
}
