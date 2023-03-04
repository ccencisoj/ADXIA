import { config } from "~/config";
import { http } from "~/packages/http";
import { isBadResponse } from "~/helpers/isBadResponse";
import { handleBadResponse } from "~/helpers/handleBadResponse";

const deleteProduct = async (productId)=>{
  const response = http.delete(
    `${config.PRODUCTS_SERVICE_URI}/product?productId=${productId}`
  );

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  return {deleted: true};
}

export default deleteProduct;