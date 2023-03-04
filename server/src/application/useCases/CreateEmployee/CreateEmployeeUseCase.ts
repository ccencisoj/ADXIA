import { CreateEmployeeDTO } from "./CreateEmployeeDTO";
import { IHashService } from "../../services/IHashService";
import { EmployeeException } from "../../exceptions/EmployeeException";
import { ValidationException } from "../../exceptions/ValidationException";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";
import { EmployeeAlreadyRegisteredException } from "../../exceptions/EmployeeAlreadyRegisteredException";
import { 
  Result,
  DateTime,
  Employee, 
  PersonName, 
  PersonEmail, 
  PersonSurname, 
  PersonDocument,
  DomainEvents,
  EmployeeType, 
} from "../../../domain";

type Response = Promise<Employee>;

interface CreateEmployeeUseCaseDeps {
  employeeRepository: IEmployeeRepository;
  hashService: IHashService;
  employeeTokenService: IEmployeeTokenService;
}

export class CreateEmployeeUseCase {
  protected readonly employeeRepository: IEmployeeRepository;
  protected readonly hashService: IHashService;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    employeeRepository, 
    hashService,
    employeeTokenService
  }: CreateEmployeeUseCaseDeps) {
    this.employeeRepository = employeeRepository;
    this.hashService = hashService;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: CreateEmployeeDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN)) {
      throw new EmployeeActionNoAllowedException();
    }

    const employee = await this.employeeRepository.findOne({
      nroDocument: req.nroDocument
    });
    const alreadyRegistered = !!employee;

    if(alreadyRegistered) {
      throw new EmployeeAlreadyRegisteredException(employee);
    }

    const nameOrError = PersonName.create(req.name);
    const surnameOrError = PersonSurname.create(req.surname);
    const emailOrError = PersonEmail.create(req.email);
    const nroDocumentOrError = PersonDocument.create(req.nroDocument);
    const birthDateOrError = DateTime.create(req.birthDate);
    const typeOrError = EmployeeType.create(req.type);
    const combinedResult = Result.combine([
      nameOrError,
      surnameOrError,
      emailOrError,
      nroDocumentOrError,
      typeOrError
    ]);

    if(combinedResult.isFailure) {
      throw new ValidationException(combinedResult.getError() as string);
    }

    const accessCode = this.hashService.hash(req.accessCode);

    const newEmployeeOrError = Employee.create({
      name: nameOrError.getValue(),
      surname: surnameOrError.getValue(),
      email: emailOrError.getValue(),
      nroDocument: nroDocumentOrError.getValue(),
      birthDate: birthDateOrError.getValue(),
      imageURL: req.imageURL,
      type: typeOrError.getValue(),
      accessCode: accessCode,
      phone: req.phone
    });

    if(newEmployeeOrError.isFailure) {
      throw new EmployeeException(newEmployeeOrError.getError() as string);
    }

    const newEmployee = newEmployeeOrError.getValue();

    await this.employeeRepository.save(newEmployee);

    DomainEvents.dispatchEvents(newEmployee);

    return newEmployee
  }
}
