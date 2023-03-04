import { config } from "~/config";
import { http } from "~/packages/http";
import { Order } from "~/models/Order";
import { isBadResponse } from "~/helpers/isBadResponse";
import { handleBadResponse } from "~/helpers/handleBadResponse";

const createOrder = async ()=> {
  const response = await http.post(
    `${config.ORDERS_SERVICE_URI}/order`
  );

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  const data = response.data;

  const order = new Order(data.order);

  return order;
}

export default createOrder;