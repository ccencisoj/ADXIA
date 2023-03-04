import { Client, EmployeeType } from "../../../domain";
import { GetClientByIdDTO } from "./GetClientByIdDTO";
import { IClientRepository } from "../../repositories/IClientRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { ClientNoFoundException } from "../../exceptions/ClientNoFoundException";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<Client>;

interface GetClientByIdUseCaseDeps {
  clientRepository: IClientRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class GetClientByIdUseCase {
  protected readonly clientRepository: IClientRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    clientRepository,
    employeeTokenService
  }: GetClientByIdUseCaseDeps) {
    this.clientRepository = clientRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: GetClientByIdDTO): Response => {
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

    const client = await this.clientRepository.findOne({id: req.clientId});
    const clientFound = !!client;

    if(!clientFound) {
      throw new ClientNoFoundException();
    }

    return client;
  }
}