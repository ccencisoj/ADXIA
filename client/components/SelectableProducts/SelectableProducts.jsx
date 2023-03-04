import React from "react";
import View from "./View";
import { agent } from "~/agent";
import { useQuery } from "react-query";
import { useOrder } from "~/contexts/orderContext";
import { useSearch } from "~/contexts/searchContext";

function SelectableProducts({onSelectProduct}) {
  const { searchValue } = useSearch();

  const { products: orderProducts } = useOrder();

  let { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async ()=> agent.Product.getList(0, 20, searchValue)
  })

  if(products) {
    products = products.filter((product)=> (
      !(orderProducts.some((oProduct)=> oProduct.id === product.id))
    ))
  }

  return (
    <View products={products} onSelectProduct={onSelectProduct}/>
  )
}

export { SelectableProducts };
