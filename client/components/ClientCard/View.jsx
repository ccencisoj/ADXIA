import React from "react";
import { useMutation, useQueryClient } from "react-query";
import PersonCard from "../PersonCard/PersonCard";
import OptionsModalCard from "../OptionsModalCard/OptionsModalCard";
import { Edit3, Trash } from "react-feather";
import { agent } from "~/agent";

function View({clientData, options, onClick}) {

  const queryClient = useQueryClient();

  const deleteClientMutation = useMutation({
    mutationKey: ["deleteClient"],
    mutationFn: agent.Client.delete,
    onSuccess: ()=> {
      queryClient.invalidateQueries("clients")      
    }
  });

  return (
    <PersonCard 
      personData={{
        imageURL: clientData.imageURL,
        name: clientData.name,
        surname: clientData.surname,
        info: clientData.business
      }} 
      options={options} 
      onClick={onClick}>
      <OptionsModalCard
        icon={<Edit3 width={27} height={27} />}
        href={`/clients/edit/${clientData.id}`}
        message={"Editar cliente"}
      />
      <OptionsModalCard
        icon={<Trash width={27} height={27} />}
        message={"Eliminar cliente"}
        onClick={()=> deleteClientMutation.mutate(clientData)}
      />
    </PersonCard>
  );
}

export default View;
