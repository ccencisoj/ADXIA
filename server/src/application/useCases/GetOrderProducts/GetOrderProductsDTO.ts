export interface GetOrderProductsDTO {
  orderId: string;
  skip: number;
  limit: number;
  employeeToken: string;
}
