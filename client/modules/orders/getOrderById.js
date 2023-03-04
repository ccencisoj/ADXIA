import { config } from '~/config';
import { http } from '~/packages/http';
import { Order } from '~/models/Order';
import { isBadResponse } from '~/helpers/isBadResponse';
import { handleBadResponse } from '~/helpers/handleBadResponse';

export const getOrderById = async (orderId)=> {
  const response = await http.get(
    `${config.ORDERS_SERVICE_URI}/order?orderId=${orderId}`
  );

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  const data = response.data;

  const order = new Order(data.order);

  return order;
}
