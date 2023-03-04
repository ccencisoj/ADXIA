import React from "react";
import { useIsFetching, useQueryClient } from 'react-query';
import SearchInput from "~/components/SearchInput/SearchInput";
import PrincipalLayout from "~/layout/PrincipalLayout";
import OptionsNavBar from "~/components/OptionsNavBar/OptionsNavBar";
import style from "./orders.module.scss";
import { Orders } from "~/components/Orders/Orders";
import OrdersSkeleton from "~/components/OrdersSkeleton/OrdersSkeleton";
import { useOrder } from "~/contexts/orderContext";
import { useSearch } from "~/contexts/searchContext";
import { Tabs } from "~/components/Tabs/Tabs";
import { HomeNavBar } from "~/components/HomeNavBar/HomeNavBar";
import { EmployeeProvider, useEmployee } from "~/contexts/employeeContext";
import { requiredEmployee } from "~/helpers/requiredEmployee";
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_DELIVERER, EMPLOYEE_TYPE_VENDOR } from "~/constants/employeeTypes";

function Index({employee}) {
  const { resetState } = useOrder();

  const queryClient = useQueryClient();

  const { resetSearch, setSearchValue, setDeliveryState } = useSearch();

  const isFetchingOrders = useIsFetching(["orders"]);

  React.useEffect(()=> { 
    resetState();
    resetSearch();

    if(employee.type === EMPLOYEE_TYPE_ADMIN || 
      employee.type === EMPLOYEE_TYPE_VENDOR) {
        setDeliveryState("");
      }

    queryClient.invalidateQueries("orders");
  }, []);

  return (
    <EmployeeProvider employee={employee}>
      <PrincipalLayout
        title={"Lista de pedidos"}
        className={style.searchHeader}
        color={"#ffff"}
        backHref="/home"
        header={
        <SearchInput 
          placeholder={"Buscar pedido"}
          onSearchValue={(searchValue)=> {
            setSearchValue(searchValue);
            queryClient.invalidateQueries("orders");
          }} 
        />
      }
      >
        <div className={style.ordersList}>
          {(employee.type === EMPLOYEE_TYPE_DELIVERER) ? 
            <Tabs initialSelected={{id: "1"}} items={[
            {id: "1", value: "Pedidos entregados", onSelect: ()=> {
              setDeliveryState("DELIVERED");
              queryClient.invalidateQueries("orders");
            }},
            {id: "2", value: "Pedidos no entregados", onSelect: ()=> {
              setDeliveryState("NO_DELIVERED");
              queryClient.invalidateQueries("orders");
            }},
          ]}/>: null}
          {isFetchingOrders ? <OrdersSkeleton/> : <Orders/>}
        </div>
        <HomeNavBar>
          <OptionsNavBar linkAdd={'/orders/add'}/>
        </HomeNavBar>
      </PrincipalLayout>
    </EmployeeProvider>
  );
}

export default Index;

export const getServerSideProps = requiredEmployee((employee)=> {

  return {props: {employee}};
});
