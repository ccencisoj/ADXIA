import { DeleteEmployeeDTO } from "./DeleteEmployeeDTO";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { DeletedEmployeeEvent, DomainEvents, EmployeeType } from "../../../domain";
import { EmployeeNoFoundException } from "../../exceptions/EmployeeNoFoundException";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<void>;

interface DeleteEmployeeUseCaseDeps {
  employeeRepository: IEmployeeRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class DeleteEmployeeUseCase {
  protected readonly employeeRepository: IEmployeeRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    employeeRepository,
    employeeTokenService
  }: DeleteEmployeeUseCaseDeps) {
    this.employeeRepository = employeeRepository;
    this.employeeTokenService = employeeTokenService;
  } 

  public execute = async (req: DeleteEmployeeDTO): Response => {
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

    await this.employeeRepository.delete(employee);

    employee.addDomainEvent(new DeletedEmployeeEvent(employee));

    DomainEvents.dispatchEvents(employee);
  }
}
