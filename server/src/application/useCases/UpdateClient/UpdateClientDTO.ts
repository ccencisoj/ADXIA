export interface UpdateClientDTO {
  clientId: string;
  name?: string;
  surname?: string;
  nroDocument?: string;
  phoneNumber?: string;
  address?: string;
  imageURL?: string;
  business?: string;
  employeeToken: string;
}
