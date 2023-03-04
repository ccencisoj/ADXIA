import { Employee } from "../../../domain";
import { LoginEmployeeDTO } from "./LoginEmployeeDTO";
import { IEmployeeRepository } from "../../repositories/IEmployeeRepository";
import { IEmployeeTokenService } from "../../services/IEmployeeTokenService";
import { EmployeeCredentialsException } from "../../exceptions/EmployeeCredentialsException";
import { IHashService } from "../../services/IHashService";

type Response = Promise<{
  employee: Employee;
  employeeToken: string;
}>;

interface LoginEmployeeUseCaseDeps {
  employeeRepository: IEmployeeRepository;
  employeeTokenService: IEmployeeTokenService;
  hashService: IHashService;
}

export class LoginEmployeeUseCase {
  protected readonly employeeRepository: IEmployeeRepository;
  protected readonly employeeTokenService: IEmployeeTokenService;
  protected readonly hashService: IHashService;

  public constructor({
    employeeRepository,
    employeeTokenService,
    hashService
  }: LoginEmployeeUseCaseDeps) {
    this.employeeRepository = employeeRepository;
    this.employeeTokenService = employeeTokenService;
    this.hashService = hashService;
  }

  public execute = async (req: LoginEmployeeDTO): Response => {
    const employee = await this.employeeRepository.findOne({nroDocument: req.nroDocument});
    const employeeFound = !!employee;

    if(!employeeFound) {
      throw new EmployeeCredentialsException();
    }

    const areEquals = this.hashService.equals(employee.accessCode, req.accessCode);

    if(!areEquals) {
      throw new EmployeeCredentialsException();
    }

    const employeeToken = this.employeeTokenService.generate(employee);

    return { employee, employeeToken };
  }
}
