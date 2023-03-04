import React from "react";
import PrincipalLayout from "~/layout/PrincipalLayout";
import SearchInput from "~/components/SearchInput/SearchInput";
import styles from "./styles/product.module.scss";
import { useIsFetching } from "react-query";
import ProductsSkeleton from "~/components/ProductsSkeleton/View";
import { useRouter } from "next/router";
import { SelectableProducts } from "~/components/SelectableProducts/SelectableProducts";
import { useOrder } from "~/contexts/orderContext";

function Index() {
  const { setSelectedProduct } = useOrder();

  const router = useRouter();

  const isFetchingProducts = useIsFetching(["products"]);

  return (
    <PrincipalLayout
      title={"Seleccionar producto"}
      color={"#fff"}
      header={<SearchInput placeholder={"Buscar producto"} />}
      className={styles.searchHeader}
    >
      <div className={styles.productListContainer}>
        {
          isFetchingProducts ? 
          <ProductsSkeleton/> : 
          <SelectableProducts 
            onSelectProduct={(product)=> {
              setSelectedProduct({...product, productId: product.id, quantity: 1});
              router.push("/orders/edit/select/product/details");
            }}/>}
      </div>
    </PrincipalLayout>
  );
}

export default Index;
