export interface UpdateEmployeeDTO {
  employeeId: string;
  name?: string;
  surname?: string;
  email?: string;
  nroDocument?: string;
  birthDate?: string;
  imageURL?: string;
  type?: string;
  accessCode?: string;
  phone?: string;
  employeeToken: string;
}
