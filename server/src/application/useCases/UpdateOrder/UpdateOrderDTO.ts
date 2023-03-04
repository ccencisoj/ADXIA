export interface UpdateOrderDTO {
  orderId: string;
  clientId: string;
  deliveryState: string;
  employeeToken: string;
  products: ({productId: string, quantity: number})[],
}
