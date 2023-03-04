import { EmployeeType, OrderProduct } from "../../../domain";
import { GetOrderProductsDTO } from "./GetOrderProductsDTO";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { OrderNoFoundException } from "../../exceptions/OrderNoFoundException";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { IOrderProductRepository } from "../../repositories/IOrderProductRepository";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<OrderProduct[]>;

interface GetOrderProductsUseCaseDeps {
  orderRepository: IOrderRepository;
  orderProductRepository: IOrderProductRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class GetOrderProductsUseCase {
  protected readonly orderRepository: IOrderRepository;
  protected readonly orderProductRepository: IOrderProductRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    orderRepository, 
    orderProductRepository,
    employeeTokenService
  }: GetOrderProductsUseCaseDeps) {
    this.orderRepository = orderRepository;
    this.orderProductRepository = orderProductRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: GetOrderProductsDTO): Response => {
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

    const orderProducts = await this.orderProductRepository.findMany({orderId: order.id}, req.skip, req.limit);

    return orderProducts;
  }
}
