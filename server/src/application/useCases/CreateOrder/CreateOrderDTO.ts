export interface CreateOrderDTO {
  clientId: string,
  employeeToken: string;
  products: ({productId: string, quantity: number})[];
}
