import React from "react";
import View from "./View";
import { agent } from "~/agent";
import { useQuery } from "react-query";
import { useSearch } from "~/contexts/searchContext";

function Products() {
  const { getSearchValue } = useSearch();

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async ()=> {
      const searchValue = await getSearchValue();

      const products = await agent.Product.getList(0, 20, searchValue);

      return products;
    }
  })

  return (
    <View products={products}/>
  )
}

export { Products };
