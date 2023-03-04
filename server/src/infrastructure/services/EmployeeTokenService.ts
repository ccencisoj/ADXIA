import JWT from 'jsonwebtoken';
import { config } from '../config';
import { v4 as uuid } from 'uuid';
import { Employee, Result } from "../../domain";
import { IEmployeeTokenService } from "../../application";
import { DecodedEmployee } from '../../application/dtos/DecodedEmployee';

export class EmployeeTokenService implements IEmployeeTokenService {
  validate = (token: string): Result<any> => {
    let decodedToken: DecodedEmployee;

    try {
      decodedToken = JWT.verify(token, config.JWT_SECRET_KEY) as DecodedEmployee;
    }catch(error) {
      return Result.fail("The token isn´t valid");
    }

    return Result.ok();
  }

  generate = (employee: Employee): string => {
    const token = JWT.sign({
      key: uuid(), 
      id: employee.id,
      type: employee.type
    }, config.JWT_SECRET_KEY);
    
    return token;
  }

  decode = (token: string): Result<DecodedEmployee>  => {
    let decodedToken: DecodedEmployee;

    try {
      decodedToken = JWT.verify(token, config.JWT_SECRET_KEY) as DecodedEmployee;
    }catch(error) {
      return Result.fail("The token isn´t valid");
    }

    return Result.ok(decodedToken);
  }
}
