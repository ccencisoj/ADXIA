import React from "react";
import PersonCard from "../PersonCard/PersonCard";
import OptionsModalCard from "../OptionsModalCard/OptionsModalCard";
import { Shield, Edit3, Trash } from "react-feather";
import { useMutation, useQueryClient } from "react-query";
import { agent } from "~/agent";
import { useRouter } from "next/router";

function View({employeeData, options}) {
  const { id, imageURL, name, type,  } = employeeData;

  const router = useRouter();

  const queryClient = useQueryClient();

  const deleteEmployeeMutation = useMutation({
    mutationKey: ["deleteEmployee"],
    mutationFn: agent.Employee.delete,
    onSuccess: ()=> {
      queryClient.invalidateQueries("employees");
    }
  });

  return (
    <PersonCard personData={{
      imageURL: imageURL,
      name: name,
      surname: employeeData.surname,
      info: type
    }} 
      options={options}
      onClick={()=> router.push(`/employees/view/${employeeData.id}`)}>
      <OptionsModalCard
        href={`/employees/edit/${id}`}
        icon={<Edit3 width={27} height={27} />}
        message="Editar empleado"
      />
      <OptionsModalCard
        icon={<Trash width={27} height={27} />}
        message="Eliminar empleado"
        onClick={()=> deleteEmployeeMutation.mutate(employeeData)}
      />
    </PersonCard>
  );
}

export default View;
