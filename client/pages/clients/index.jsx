import React from "react";
import { useIsFetching, useQueryClient } from "react-query";
import PrincipalLayout from "~/layout/PrincipalLayout";
import NavBar from "~/components/NavBar/NavBar";
import SearchInput from "~/components/SearchInput/SearchInput";
import OptionsNavBar from "~/components/OptionsNavBar/OptionsNavBar";
import style from "./clients.module.scss";
import { Clients } from "~/components/Clients/Clients";
import { ClientsSkeleton } from "~/components/ClientsSkeleton/ClientsSkeleton";
import { useSearch } from "~/contexts/searchContext";
import { HomeNavBar } from "~/components/HomeNavBar/HomeNavBar";
import { requiredEmployee } from "~/helpers/requiredEmployee";
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_VENDOR } from "~/constants/employeeTypes";

function Index() {
  const isFetchingClients = useIsFetching(["clients"]);

  const queryClient = useQueryClient();

  const { resetSearch, setSearchValue } = useSearch();

  React.useEffect(()=> {
    resetSearch();

    queryClient.invalidateQueries("clients");
  }, []);

  return (
    //header
    <PrincipalLayout
      title={"Lista de clientes"}
      className={style.searchHeader}
      color={"#ffff"}
      header={
        <SearchInput 
          placeholder={"Buscar pedido"} 
          onSearchValue={(searchValue)=> {
            setSearchValue(searchValue);
            queryClient.invalidateQueries("clients");
          }}/>
      }
    >
      {isFetchingClients ? <ClientsSkeleton/> : <Clients/>}  
      <HomeNavBar>
        <OptionsNavBar linkAdd={"/clients/add"} />
      </HomeNavBar>
    </PrincipalLayout>
  );
}

export default Index;

export const getServerSideProps = requiredEmployee((employee)=> {
  
  if((employee.type === EMPLOYEE_TYPE_ADMIN ||
    employee.type === EMPLOYEE_TYPE_VENDOR)) {
    return {props: {employee}};
  }

  return {props: {}, redirect: {destination: "/home"}};
});
