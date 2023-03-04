import { GetOrderByIdDTO } from "./GetOrderByIdDTO";
import { EmployeeType, Order } from "../../../domain";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { OrderNoFoundException } from "../../exceptions/OrderNoFoundException";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<Order>;

interface GetOrderByIdUseCaseDeps {
  orderRepository: IOrderRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class GetOrderByIdUseCase {
  protected readonly orderRepository: IOrderRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    orderRepository,
    employeeTokenService
  }: GetOrderByIdUseCaseDeps) {
    this.orderRepository = orderRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: GetOrderByIdDTO): Response => {
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

    return order;
  }
}
