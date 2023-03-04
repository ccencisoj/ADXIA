import { config } from '~/config';
import { http } from '~/packages/http';
import { isBadResponse } from '~/helpers/isBadResponse';
import { handleBadResponse } from '~/helpers/handleBadResponse';

const deleteOrder = async (orderId)=> {
  const response = await http.delete(
    `${config.ORDERS_SERVICE_URI}/order?orderId=${orderId}`
  );

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  return {deleted: true};
}

export default deleteOrder;