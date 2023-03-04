import { Employee } from '../../domain';
import { IBaseRepository } from './IBaseRepository';

export interface IEmployeeRepository extends IBaseRepository<Employee> {}
