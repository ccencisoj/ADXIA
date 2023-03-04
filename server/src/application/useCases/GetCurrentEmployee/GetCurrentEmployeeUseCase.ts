import { Employee } from "../../../domain";
import { GetCurrentEmployeeDTO } from "./GetCurrentEmployeeDTO";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { EmployeeNoFoundException } from "../../exceptions/EmployeeNoFoundException";

type Response = Promise<Employee>;

interface GetCurrentEmployeeUseCaseDeps {
  employeeTokenService: IEmployeeTokenService; 
  employeeRepository: IEmployeeRepository;
}

export class GetCurrentEmployeeUseCase {
  protected readonly employeeTokenService: IEmployeeTokenService;
  protected readonly employeeRepository: IEmployeeRepository;

  public constructor({
    employeeTokenService,
    employeeRepository
  }: GetCurrentEmployeeUseCaseDeps) {
    this.employeeTokenService = employeeTokenService;
    this.employeeRepository = employeeRepository;
  }

  public execute = async (req: GetCurrentEmployeeDTO): Response => {
    const decodeEmployeeOrError = this.employeeTokenService.decode(req.employeeToken);

    if(decodeEmployeeOrError.isFailure) {
      throw new EmployeeCredentialsException(decodeEmployeeOrError.getError() as string);
    }

    const decodeEmployee = decodeEmployeeOrError.getValue();

    const employee = await this.employeeRepository.findOne({id: decodeEmployee.id});
    const employeeFound = !!employee;

    if(!employeeFound) {
      throw new EmployeeNoFoundException();
    }

    return employee;
  }
}
