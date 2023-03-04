import React from "react";
import { useQuery } from "react-query";
import { agent } from "~/agent";
import View from "./View";
import { useSearch } from "~/contexts/searchContext";

export function Orders() {
  const { getSearchValue, getDeliveryState } = useSearch();

  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: async ()=> {
      const searchValue = await getSearchValue();
      const deliveryState = await getDeliveryState();

      const orders = await agent.Order.getList(0, 20, searchValue, deliveryState);

      return orders;
    }
  });

  return (
    <View orders={orders}/>
  )
}
