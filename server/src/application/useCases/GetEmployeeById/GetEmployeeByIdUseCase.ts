import { Employee, EmployeeType } from "../../../domain";
import { GetEmployeeByIdDTO } from "./GetEmployeeByIdDTO";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { EmployeeNoFoundException } from "../../exceptions/EmployeeNoFoundException";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<Employee>;

interface GetEmployeeByIdUseCaseDeps {
  employeeRepository: IEmployeeRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class GetEmployeeByIdUseCase {
  protected readonly employeeRepository: IEmployeeRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    employeeRepository, 
    employeeTokenService
  }: GetEmployeeByIdUseCaseDeps) {
    this.employeeRepository = employeeRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: GetEmployeeByIdDTO): Response => {
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

    return employee;
  }
}
