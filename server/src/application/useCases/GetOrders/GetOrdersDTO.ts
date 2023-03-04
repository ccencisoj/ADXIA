export interface GetOrdersDTO {
  skip: number;
  limit: number;
  employeeToken: string;
  searchValue?: string;
  deliveryState?: string;
}
