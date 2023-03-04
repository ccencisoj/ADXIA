import { GetEmployeesDTO } from './GetEmployeesDTO';
import { Employee, EmployeeType } from "../../../domain";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeActionNoAllowedException } from "../../exceptions/EmployeeActionNoAllowedException";

type Response = Promise<Employee[]>;

interface GetEmployeesUseCaseDeps {
  employeeRepository: IEmployeeRepository;
  employeeTokenService: IEmployeeTokenService;
}

export class GetEmployeesUseCase {
  protected readonly employeeRepository: IEmployeeRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;

  public constructor({
    employeeRepository,
    employeeTokenService
  }: GetEmployeesUseCaseDeps) {
    this.employeeRepository = employeeRepository;
    this.employeeTokenService = employeeTokenService;
  }

  public execute = async (req: GetEmployeesDTO): Response => {
    const decodedEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodedEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodedEmployeeOrError.getError() as string);
    }

    const decodedEmployee = decodedEmployeeOrError.getValue();

    if(!(decodedEmployee.type === EmployeeType.ADMIN)) {
      throw new EmployeeActionNoAllowedException();
    }

    let employees;

    if(req.searchValue) {
      employees = await this.employeeRepository.findMany({
        $or: [
          {name: {$regex: `.*${req.searchValue}.*`, $options: "i"}}, 
          {surname: {$regex: `.*${req.searchValue}.*`, $options: "i"}},
          {email: {$regex: `.*${req.searchValue}.*`, $options: "i"}},
          {nroDocument: {$regex: `.*${req.searchValue}.*`, $options: "i"}},
          {type: {$regex: `.*${req.searchValue}.*`, $options: "i"}},
          {phone: {$regex: `.*${req.searchValue}.*`, $options: "i"}},
        ]
      }, req.skip, req.limit);

    }else {
      employees = await this.employeeRepository.findMany({}, req.skip, req.limit);
    }

    return employees;
  }
}
