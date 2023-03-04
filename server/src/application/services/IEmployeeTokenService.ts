import { Employee, Result } from '../../domain';
import { DecodedEmployee } from '../dtos/DecodedEmployee';

export interface IEmployeeTokenService {
  generate(employee: Employee): string;
  validate(token: string): Result<any>;  
  decode(token: string): Result<DecodedEmployee>;
}
