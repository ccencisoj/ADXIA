import React from "react";
import styles from "./styles.module.scss";
import ProductCard from "~/components/ProductCard/ProductCard";
import { NothingMessage } from "~/components/NothingMessage/NothingMessage";
import { useRouter } from "next/router";

function View({ products }) {

  const router = useRouter();

  return (Array.isArray(products) && products.length) ?
    <div className={styles.products}>        
      {products.map((product)=> (
        <ProductCard 
          key={product.id} 
          productData={product} 
          options={true}
          onClick={()=> router.push(`/products/view/${product.id}`)}/>
      ))}
    </div> :
  <NothingMessage message="No hay productos"/>
}

export default View;
