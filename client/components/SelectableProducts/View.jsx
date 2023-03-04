import React from "react";
import styles from "./styles.module.scss";
import ProductCard from "~/components/ProductCard/ProductCard";
import { NothingMessage } from "~/components/NothingMessage/NothingMessage";

function View({ products, onSelectProduct }) {
  return (Array.isArray(products) && products.length) ?
    <div className={styles.products}>
      {products.map((product)=> (
        <ProductCard 
        key={product.id} 
        productData={product} 
        onClick={()=> onSelectProduct(product)}/>
        ))}
    </div> :
  <NothingMessage message="No hay productos"/>
}

export default View;
