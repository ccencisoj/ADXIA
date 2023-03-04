import React from "react";
import Link from "next/link";
import { Plus, X } from "react-feather";
import styles from "./styles.module.scss";
import { useOrder } from "~/contexts/orderContext";
import ProductCard from "~/components/ProductCard/ProductCard";
import { useRouter } from "next/router";

function View({addHref, editHref, readOnly}) {
  const { products, setSelectedProduct, deleteProduct } = useOrder();

  const router = useRouter();

  return (
    <div className={styles.productList}>
      {!(readOnly) ?
      <Link href={addHref}>
        <div className={styles.addProduct}>
          <Plus color='#01237A' width={75} height={75}/>
          <span>Agregar producto</span>
        </div>
      </Link> : null}
      {products.map((product)=> (
        <div key={product.id} className={styles.productCard}>
          <ProductCard 
            productData={{
              ...product, 
              avaliableQuantity: product.quantity
            }}
            onClick={()=> {
              if(!(readOnly)) {
                setSelectedProduct({...product, productId: product.productId});

                router.push(editHref);
              }
            }}/>
          {!(readOnly) ? 
          <button 
            className={styles.close}
            onClick={()=> deleteProduct(product)}>
            <X className={styles.icon}/>
          </button>
          : null}
        </div>
      ))}
    </div>
  )
}

export default View;
