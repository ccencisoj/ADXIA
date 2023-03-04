import { DeleteClientDTO } from './DeleteClientDTO';
import { IOrderRepository } from '../../repositories/IOrderRepository';
import { IClientRepository } from '../../repositories/IClientRepository';
import { IEmployeeTokenService } from '../../services/IEmployeeTokenService';
import { ClientNoFoundException } from '../../exceptions/ClientNoFoundException';
import { DeletedClientEvent, EmployeeType } from '../../../domain';
import { EmployeeCredentialsException } from '../../exceptions/EmployeeCredentialsException';
import { EmployeeActionNoAllowedException } from '../../exceptions/EmployeeActionNoAllowedException';

type Response = Promise<void>;

interface DeleteClientUseCaseDeps {
  clientRepository: IClientRepository;
  orderRepository: IOrderRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class DeleteClientUseCase {
  protected readonly clientRepository: IClientRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;
  protected readonly orderRepository: IOrderRepository;

  public constructor({
    clientRepository,
    employeeTokenService,
    orderRepository
  }: DeleteClientUseCaseDeps) {
    this.clientRepository = clientRepository;
    this.employeeTokenService = employeeTokenService;
    this.orderRepository = orderRepository;
  }

  public execute = async (req: DeleteClientDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN ||
      decodedEmployee.type === EmployeeType.VENDOR)) {
      throw new EmployeeActionNoAllowedException();
    }

    const client = await this.clientRepository.findOne({id: req.clientId});
    const clientFound = !!client;

    if(!clientFound) {
      throw new ClientNoFoundException();
    }

    await this.clientRepository.delete(client);

    client.addDomainEvent(new DeletedClientEvent(client));

    await this.orderRepository.deleteMany({clientId: client.id});
  }
}
