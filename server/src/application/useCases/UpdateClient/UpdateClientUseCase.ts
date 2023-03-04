import { UpdateClientDTO } from "./UpdateClientDTO";
import { ClientException } from "../../exceptions/ClientException";
import { IClientRepository } from "../../repositories/IClientRepository";
import { ValidationException } from "../../exceptions/ValidationException";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { ClientNoFoundException } from "../../exceptions/ClientNoFoundException";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";
import { 
  Client, 
  Result,
  PersonName, 
  PersonSurname, 
  PersonDocument, 
  PersonPhoneNumber,
  UpdatedClientEvent,
  DomainEvents,
  EmployeeType
} from "../../../domain";

type Response = Promise<void>;

interface UpdateClientUseCaseDeps {
  clientRepository: IClientRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class UpdateClientUseCase {
  protected readonly clientRepository: IClientRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    clientRepository,
    employeeTokenService
  }: UpdateClientUseCaseDeps) {
    this.clientRepository = clientRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: UpdateClientDTO): Response => {
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

    const nameOrError = PersonName.create(req.name || client.name);
    const surnameOrError = PersonSurname.create(req.surname || client.surname);
    const nroDocumentOrError = PersonDocument.create(req.nroDocument || client.nroDocument);
    const phoneNumberOrError = PersonPhoneNumber.create(req.phoneNumber || client.phoneNumber);
    const combineResult = Result.combine([
      nameOrError,
      surnameOrError,
      nroDocumentOrError,
      phoneNumberOrError
    ]);

    if(combineResult.isFailure) {
      throw new ValidationException(combineResult.getError() as string);
    }

    const updatedClientOrError = Client.create({
      name: nameOrError.getValue(),
      surname: surnameOrError.getValue(),
      nroDocument: nroDocumentOrError.getValue(),
      phoneNumber: phoneNumberOrError.getValue(),
      address: req.address,
      imageURL: req.imageURL,
      business: req.business
    }, client.id);

    if(updatedClientOrError.isFailure) {
      throw new ClientException(updatedClientOrError.getError() as string);
    }

    const updatedClient = updatedClientOrError.getValue();

    await this.clientRepository.save(updatedClient);

    updatedClient.addDomainEvent(new UpdatedClientEvent(updatedClient));

    DomainEvents.dispatchEvents(updatedClient);
  }
}
