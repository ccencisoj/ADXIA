import { UpdateOrderDTO } from "./UpdateOrderDTO";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IProductRepository } from "../../repositories/IProductRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { OrderNoFoundException } from "../../exceptions/OrderNoFoundException";
import { OrderProductException } from "../../exceptions/OrderProductException";
import { IOrderProductRepository } from "../../repositories/IOrderProductRepository";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";
import { DateTime, EmployeeType, Order, OrderProduct, Product, ProductBrand, ProductName, ProductPrice, ProductQuantity, Result } from "../../../domain";
import { OrderException } from "../../exceptions/OrderException";
import { ValidationException } from "../../exceptions/ValidationException";
import { ProductException } from "../../exceptions/ProductException";
import { DeliveryState } from "../../../domain/DeliveryState";

type Response = Promise<void>;

interface UpdateOrderUseCaseDeps {
  orderRepository: IOrderRepository;
  productRepository: IProductRepository;
  orderProductRepository: IOrderProductRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class UpdateOrderUseCase {
  protected readonly orderRepository: IOrderRepository;
  protected readonly productRepository: IProductRepository;
  protected readonly orderProductRepository: IOrderProductRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;
  
  public constructor({
    orderRepository, 
    productRepository,
    orderProductRepository,
    employeeTokenService
  }: UpdateOrderUseCaseDeps) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.employeeTokenService = employeeTokenService;
    this.orderProductRepository = orderProductRepository;
  }

  public execute = async (req: UpdateOrderDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN ||
      decodedEmployee.type === EmployeeType.VENDOR ||
      decodedEmployee.type === EmployeeType.DELIVERER)) {
      throw new EmployeeActionNoAllowedException();
    }

    const order = await this.orderRepository.findOne({id: req.orderId});
    const orderFound = !!order;

    if(!orderFound) {
      throw new OrderNoFoundException();
    }

    let total = order.total;

    if(req.products && 
      ((decodedEmployee.type === EmployeeType.ADMIN) || 
      (decodedEmployee.type === EmployeeType.VENDOR))) {

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
  
      total = 0;
  
      for(let reqProduct of req.products) {
        const product = await this.productRepository.findOne({id: reqProduct.productId});
        const productFound = !!product;
  
        if(productFound && (product.avaliableQuantity - reqProduct.quantity) >= 0) {
          const nameOrError = ProductName.create(product.name);
          const brandOrError = ProductBrand.create(product.brand);
          const quantityOrError = ProductQuantity.create(reqProduct.quantity);
          const priceOrError = ProductPrice.create(product.price);
          const orderProductOrError = OrderProduct.create({
            orderId: order.id,
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
    }

    let deliveryState = DeliveryState.create(order.deliveryState).getValue();
    let deliveredAt = order.deliveredAt;

    if(req.deliveryState && 
      ((decodedEmployee.type === EmployeeType.ADMIN) || 
      (decodedEmployee.type === EmployeeType.DELIVERER))
      ) {
      
      const deliveryStateOrError = DeliveryState.create(req.deliveryState || order.deliveryState);
      const deliveredAtOrError = DateTime.create(
        req.deliveryState === DeliveryState.DELIVERED ? DateTime.current() : ""
      );

      const combinedResult = Result.combine([
        deliveredAtOrError,
        deliveredAtOrError
      ]);

      if(combinedResult.isFailure) {
        throw new ValidationException(combinedResult.getError() as string);
      }

      deliveryState = deliveryStateOrError.getValue();
      deliveredAt = deliveredAtOrError.getValue();
    }

    const updatedOrderOrError = Order.create({
      createdAt: order.createdAt,
      employeeId: order.employeeId,
      clientId: req.clientId,
      deliveredAt: deliveredAt,
      deliveryState: deliveryState,
      total: total
    }, order.id);

    if(updatedOrderOrError.isFailure) {
      throw new OrderException(updatedOrderOrError.getError() as string);
    }
    
    const updatedOrder = updatedOrderOrError.getValue();

    await this.orderRepository.save(updatedOrder);

    if(req.products && 
      (decodedEmployee.type === EmployeeType.ADMIN) || 
      (decodedEmployee.type === EmployeeType.VENDOR)) {
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
    }
  }
}
