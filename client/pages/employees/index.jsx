import React from "react";
import NavBar from "~/components/NavBar/NavBar";
import OptionsNavBar from "~/components/OptionsNavBar/OptionsNavBar";
import SearchInput from "~/components/SearchInput/SearchInput";
import PrincipalLayout from "~/layout/PrincipalLayout";
import style from "./employees.module.scss";
import { Employees } from "~/components/Employees/Employees";
import { useIsFetching, useQueryClient } from "react-query";
import { EmployeesSkeleton } from "~/components/EmployeesSkeleton/EmployeesSkeleton";
import { useSearch } from "~/contexts/searchContext";
import queryClient from "~/query/queryClient";
import { HomeNavBar } from "~/components/HomeNavBar/HomeNavBar";
import { requiredEmployee } from "~/helpers/requiredEmployee";
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_VENDOR } from "~/constants/employeeTypes";
import { EmployeeProvider } from "~/contexts/employeeContext";

function Index({employee}) {
  const isFetchingEmployees = useIsFetching(["employees"]);

  const queryClient = useQueryClient();

  const { resetSearch, setSearchValue } = useSearch();

  React.useEffect(()=> {
    resetSearch();

    queryClient.invalidateQueries("employees");
  }, []);

  return (
    <EmployeeProvider employee={employee}>
      <PrincipalLayout
        title={"Lista de empleados"}
        color={"#ffff"}
        className={style.searchHeader}
        header={
          <SearchInput 
            placeholder={"Buscar empleado"} 
            onSearchValue={(searchValue)=> {
              setSearchValue(searchValue);
              queryClient.invalidateQueries("employees");
            }}
        />}
      >
        {isFetchingEmployees ? <EmployeesSkeleton/> : <Employees/>}
        <HomeNavBar>
          <OptionsNavBar linkAdd={"/employees/add"} />
        </HomeNavBar>
      </PrincipalLayout>
    </EmployeeProvider>
  );
}

export default Index;

export const getServerSideProps = requiredEmployee((employee)=> {
  
  if((employee.type === EMPLOYEE_TYPE_ADMIN ||
    employee.type === EMPLOYEE_TYPE_VENDOR)) {
    return {props: {employee}};
  }

  return {props: {employee}, redirect: {destination: "/home"}};
});
