import React from "react";
import PrincipalLayout from "~/layout/PrincipalLayout";
import SearchInput from "~/components/SearchInput/SearchInput";
import styles from "./styles/product.module.scss";
import { useIsFetching, useQueryClient } from "react-query";
import ProductsSkeleton from "~/components/ProductsSkeleton/View";
import { useRouter } from "next/router";
import { SelectableProducts } from "~/components/SelectableProducts/SelectableProducts";
import { useOrder } from "~/contexts/orderContext";
import { useSearch } from "~/contexts/searchContext";

function Index() {
  const { setSelectedProduct } = useOrder();

  const router = useRouter();

  const isFetchingProducts = useIsFetching(["products"]);

  const queryClient = useQueryClient();

  const { resetSearch, setSearchValue } = useSearch();

  React.useEffect(()=> {
    resetSearch();
    queryClient.invalidateQueries("products");
  }, []);

  return (
    <PrincipalLayout
      title={"Seleccionar producto"}
      color={"#fff"}
      header={
        <SearchInput 
          placeholder={"Buscar producto"} 
          onSearchValue={(searchValue)=> {
            setSearchValue(searchValue);
            queryClient.invalidateQueries("products");
          }}
        />
      }
      className={styles.searchHeader}
      
    >
      <div className={styles.productListContainer}>
        {
          isFetchingProducts ? 
          <ProductsSkeleton/> : 
          <SelectableProducts 
            onSelectProduct={(product)=> {
              setSelectedProduct({...product, productId: product.id, quantity: 1});
              router.push("/orders/add/select/product/details");
            }}/>}
      </div>
    </PrincipalLayout>
  );
}

export default Index;
