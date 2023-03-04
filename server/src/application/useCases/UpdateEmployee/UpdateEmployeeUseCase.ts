import { UpdateEmployeeDTO } from "./UpdateEmployeeDTO";
import { IHashService } from "../../services/IHashService";
import { EmployeeException } from "../../exceptions/EmployeeException";
import { ValidationException } from "../../exceptions/ValidationException";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeNoFoundException } from "../../exceptions/EmployeeNoFoundException";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";
import { 
  Result, 
  DateTime, 
  Employee, 
  PersonName, 
  PersonEmail, 
  PersonSurname, 
  PersonDocument,
  UpdatedEmployeeEvent,
  DomainEvents,
  EmployeeType
} from "../../../domain";

type Response = Promise<void>;

interface UpdateEmployeeUseCaseDeps {
  employeeRepository: IEmployeeRepository;
  hashService: IHashService;
  employeeTokenService: IEmployeeTokenService;
}

export class UpdateEmployeeUseCase {
  protected readonly employeeRepository: IEmployeeRepository;
  protected readonly hashService: IHashService;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    employeeRepository, 
    hashService, 
    employeeTokenService
  }: UpdateEmployeeUseCaseDeps) {
    this.employeeRepository = employeeRepository;
    this.hashService = hashService;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: UpdateEmployeeDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN)) {
      throw new EmployeeActionNoAllowedException();
    }

    const employee = await this.employeeRepository.findOne({id: req.employeeId});
    const employeeFound = !!employee;

    if(!employeeFound) {
      throw new EmployeeNoFoundException();
    }

    const nameOrError = PersonName.create(req.name || employee.name);
    const surnameOrError = PersonSurname.create(req.surname || employee.surname);
    const emailOrError = PersonEmail.create(req.email || employee.email);
    const nroDocumentOrError = PersonDocument.create(req.nroDocument || employee.nroDocument);
    const birthDateOrError = DateTime.create(req.birthDate || employee.birthDate);
    const typeOrError = EmployeeType.create(req.type || employee.type);
    const combinedResult = Result.combine([
      nameOrError,
      surnameOrError,
      emailOrError,
      nroDocumentOrError,
      birthDateOrError,
      typeOrError
    ]);

    if(combinedResult.isFailure) {
      throw new ValidationException(combinedResult.getError() as string);
    }

    const imageURL = req.imageURL || employee.imageURL;
    const type = req.type || employee.type;
    const phone = req.phone || employee.phone;

    const updatedEmployeeOrError = Employee.create({
      name: nameOrError.getValue(),
      surname: surnameOrError.getValue(),
      email: emailOrError.getValue(),
      nroDocument: nroDocumentOrError.getValue(),
      birthDate: birthDateOrError.getValue(),
      imageURL: imageURL,
      type: typeOrError.getValue(),
      accessCode: employee.accessCode,
      phone: phone
    }, employee.id);

    if(updatedEmployeeOrError.isFailure) {
      throw new EmployeeException(updatedEmployeeOrError.getError() as string);
    }

    const updatedEmployee = updatedEmployeeOrError.getValue();

    await this.employeeRepository.save(updatedEmployee);

    updatedEmployee.addDomainEvent(new UpdatedEmployeeEvent(employee));

    DomainEvents.dispatchEvents(updatedEmployee);
  }
}
