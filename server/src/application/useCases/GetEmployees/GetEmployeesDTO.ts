export interface GetEmployeesDTO {
  skip: number;
  limit: number;
  searchValue: string;
  employeeToken: string;
}
