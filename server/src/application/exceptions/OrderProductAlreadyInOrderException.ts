import { OrderProduct } from "../../domain";
import { ApplicationException } from "../common/ApplicationException";

export class OrderProductAlreadyInOrder extends ApplicationException {
  public constructor(orderProduct: OrderProduct) {
    super(
      "OrderProductAlreadyInOrder", 400, 
      `The order product ${orderProduct.name} already exists in order ${orderProduct.orderId}`
    );
  }
}
