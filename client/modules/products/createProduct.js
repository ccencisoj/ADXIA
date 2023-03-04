import { config } from "~/config";
import { http } from "~/packages/http";
import { Product } from "~/models/Product";
import { isBadResponse } from "~/helpers/isBadResponse";
import { handleBadResponse } from "~/helpers/handleBadResponse";

const createProduct = async ({
  name,
  brand,
  grammage,
  avaliableQuantity,
  price,
  imageURL
})=> {
  const response = await http.post(
    `${config.PRODUCTS_SERVICE_URI}/product?generic`,
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

export default createProduct;