import { CreateClientDTO } from './CreateClientDTO';
import { ClientException } from '../../exceptions/ClientException';
import { IClientRepository } from "../../repositories/IClientRepository";
import { ValidationException } from '../../exceptions/ValidationException';
import { IEmployeeTokenService } from '../../services/IEmployeeTokenService';
import { EmployeeCredentialsException } from '../../exceptions/EmployeeCredentialsException';
import { ClientAlreadyRegisteredException } from '../../exceptions/ClientAlreadyRegisteredException';
import { EmployeeActionNoAllowedException } from '../../exceptions/EmployeeActionNoAllowedException';
import { 
  Client, 
  Result, 
  DomainEvents,
  PersonName, 
  PersonSurname, 
  PersonDocument, 
  PersonPhoneNumber,  
  EmployeeType
} from '../../../domain';

type Response = Promise<Client>;

interface CreateClientUseCaseDeps {
  clientRepository: IClientRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class CreateClientUseCase {
  protected readonly clientRepository: IClientRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    clientRepository, 
    employeeTokenService
  }: CreateClientUseCaseDeps) {
    this.clientRepository = clientRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: CreateClientDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN ||
      decodedEmployee.type === EmployeeType.VENDOR)) {
      throw new EmployeeActionNoAllowedException();
    }

    const client = await this.clientRepository.findOne({
      nroDocument: req.nroDocument
    });
    const alreadyRegistered = !!client;

    if(alreadyRegistered) {
      throw new ClientAlreadyRegisteredException(client);
    }

    const nameOrError = PersonName.create(req.name);
    const surnameOrError = PersonSurname.create(req.surname);
    const nroDocumentOrError = PersonDocument.create(req.nroDocument);
    const phoneNumberOrError = PersonPhoneNumber.create(req.phoneNumber);
    const combinedResult = Result.combine([
      nameOrError, 
      surnameOrError,
      nroDocumentOrError,
      phoneNumberOrError
    ]);

    if(combinedResult.isFailure) {
      throw new ValidationException(combinedResult.getError() as string);
    }

    const newClientOrError = Client.create({
      name: nameOrError.getValue(),
      surname: surnameOrError.getValue(),
      nroDocument: nroDocumentOrError.getValue(),
      phoneNumber: phoneNumberOrError.getValue(),
      address: req.address,
      imageURL: req.imageURL,
      business: req.business
    });

    if(newClientOrError.isFailure) {
      throw new ClientException(newClientOrError.getError() as string);
    }

    const newClient = newClientOrError.getValue();

    await this.clientRepository.save(newClient);

    DomainEvents.dispatchEvents(newClient);

    return newClient;
  }
}
