import React from "react";
import View from "./View";
import { agent } from "~/agent";
import { useQuery } from "react-query";
import { useSearch } from "~/contexts/searchContext";

function Employees() {
  const { getSearchValue } = useSearch();

  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: async ()=> {
      const searchValue = await getSearchValue();

      const employees = await agent.Employee.getList(0, 20, searchValue);

      return employees;
    }
  });

  return (
    <View employees={employees}/>
  )
}

export { Employees };
