import { Client, EmployeeType } from "../../../domain";
import { GetClientsDTO } from "./GetClientsDTO";
import { IClientRepository } from "../../repositories/IClientRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<Client[]>;

interface GetClientsUseCaseDeps {
  clientRepository: IClientRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class GetClientsUseCase {
  protected readonly clientRepository: IClientRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    clientRepository,
    employeeTokenService
  }: GetClientsUseCaseDeps) {
    this.clientRepository = clientRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: GetClientsDTO): Response => {
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

    let clients;

    if(req.searchValue) {
      clients = await this.clientRepository.findMany({
        $or: [
          {name: {$regex: `.*${req.searchValue}.*`, $options: "i"}}, 
          {surname: {$regex: `.*${req.searchValue}.*`, $options: "i"}},
          {nroDocument: {$regex: `.*${req.searchValue}.*`, $options: "i"}},
          {phoneNumber: {$regex: `.*${req.searchValue}.*`, $options: "i"}},
          {address: {$regex: `.*${req.searchValue}.*`, $options: "i"}},
          {business: {$regex: `.*${req.searchValue}.*`, $options: "i"}}
        ]
      }, req.skip, req.limit);

    }else {
      clients = await this.clientRepository.findMany({}, req.skip, req.limit);
    }
    
    return clients;
  }  
}
