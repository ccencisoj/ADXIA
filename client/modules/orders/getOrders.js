import { config } from '~/config';
import { Order } from '~/models/Order';
import { http } from '~/packages/http';
import { isBadResponse } from '~/helpers/isBadResponse';
import { handleBadResponse } from '~/helpers/handleBadResponse';

const getOrders = async ({clientId, employeeId}, skip, limit)=> {
  const response = await http.get(
    `${config.ORDERS_SERVICE_URI}/order?skip=${skip}&&limit=${limit}`,
    {
      clientId,
      employeeId
    }
  );

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  const data = response.data;

  const orders = data.orders.map((order)=> new Order(order));

  return orders;
}

export default getOrders;