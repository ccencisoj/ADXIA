import React from "react";
import View from "./View";
import { useQuery } from "react-query";
import { agent } from "~/agent";
import { useSearch } from "~/contexts/searchContext";

function Clients() {
  const { getSearchValue } = useSearch();
  
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async ()=> {
      const searchValue = await getSearchValue();

      const clients = await agent.Client.getList(0, 20, searchValue);

      return clients;
    }
  })

  return (
    <View clients={clients}/>
  )
}

export { Clients }
