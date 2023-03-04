import { config } from "~/config";
import { http } from "~/packages/http";
import { Product } from "~/models/Product";
import { isBadResponse } from "~/helpers/isBadResponse";
import { handleBadResponse } from "~/helpers/handleBadResponse";

export const updateProduct = async ({
  name,
  brand,
  grammage,
  avaliableQuantity,
  price,
  imageURL
})=>{
  const response = await http.put(
    `${config.PRODUCTS_SERVICE_URI}/product`,
    {
      name,
      brand,
      grammage,
      avaliableQuantity,
      price,
      imageURL
    }
  );

  if(isBadResponse(response)) {
    handleBadResponse(response);
    return;
  }

  const data = response.data;

  const product = new Product(data.product);

  return product;
}

export default updateProduct;