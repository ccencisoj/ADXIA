import { config } from "~/config";

export const getProductById = async (productId)=> {
  const response = await http.get(
    `${config.PRODUCTS_SERVICE_URI}/product?productId=${productId}`
  );

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  const data = response.data;

  const product = new product(data.product);

  return product;

}
