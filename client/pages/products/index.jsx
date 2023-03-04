import React from "react";
import NavBar from "~/components/NavBar/NavBar";
import styles from "./products.module.scss";
import { useIsFetching, useQueryClient } from "react-query";
import OptionsNavBar from "~/components/OptionsNavBar/OptionsNavBar";
import { Products } from "~/components/Products/Products";
import ProductsSkeleton from "~/components/ProductsSkeleton/View";
import SearchInput from "~/components/SearchInput/SearchInput";
import PrincipalLayout from "~/layout/PrincipalLayout";
import { useSearch } from "~/contexts/searchContext";
import { requiredEmployee } from "~/helpers/requiredEmployee";
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_VENDOR } from "~/constants/employeeTypes";

function Index() {
  const isFetchingProducts = useIsFetching(["products"]);

  const queryClient = useQueryClient();

  const { resetSearch, setSearchValue } = useSearch();

  React.useEffect(()=> {
    resetSearch();
    queryClient.invalidateQueries("products");
  }, []);

  return (
    <PrincipalLayout
      title={"Listado de productos"}
      color={"#ffff"}
      className={styles.searchHeader}
      header={
        <SearchInput 
          placeholder={"Buscar producto"} 
          onSearchValue={(searchValue)=> {
            setSearchValue(searchValue);
            queryClient.invalidateQueries("products");
          }}
        />
    }
    >
      <section className={styles.productListContainer}>
        {isFetchingProducts ? <ProductsSkeleton/> : <Products/>}    
      </section>
      <NavBar>
        <OptionsNavBar linkAdd={"/products/add"} />
      </NavBar>
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
