import { Client, EmployeeType, Order } from "../../../domain";
import { GetOrdersClientsDTO } from "./GetOrdersClientsDTO";
import { IClientRepository } from "../../repositories/IClientRepository";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<{client: Client, order: Order}[]>;

interface GetOrdersClientsUseCaseDeps {
  orderRepository: IOrderRepository;
  clientRepository: IClientRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class GetOrdersClientsUseCase {
  protected readonly orderRepository: IOrderRepository;
  protected readonly clientRepository: IClientRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;
  
  public constructor({
    orderRepository,
    clientRepository,
    employeeTokenService
  }: GetOrdersClientsUseCaseDeps) {
    this.orderRepository = orderRepository;
    this.clientRepository = clientRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: GetOrdersClientsDTO):Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN || 
      decodedEmployee.type === EmployeeType.VENDOR)) {
      throw new EmployeeActionNoAllowedException();
    }

    let ordersClients = [];

    const clients = await this.clientRepository.findMany({}, req.skip, req.limit);

    for(let client of clients) {
      const order = await this.orderRepository.findOne({clientId: client.id});

      ordersClients.push({client, order});
    }

    return ordersClients;
  }
}
