import React from "react";
import View from "./View";
import { useQuery } from "react-query";
import { agent } from "~/agent";

function SelectableClients({onSelectClient, inEdit}) {
  const { data: clients } = useQuery({
    queryKey: ["ordersClients"],
    queryFn: agent.Order.getClients
  })

  return (
    <View clients={clients} inEdit={inEdit} onSelectClient={onSelectClient}/>
  )
}

export { SelectableClients };
