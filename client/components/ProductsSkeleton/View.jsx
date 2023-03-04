import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";

function ProductsSkeleton() {
  
  const CardSkeleton = ()=> (
    <div className={styles.cardSkeleton}>
      <div className={styles.topSide}>
        <Skeleton width={80} height={80} borderRadius={5}/>
      </div>
      <div className={styles.bottomSide}>
        <Skeleton height={24} count={1}/>
        <Skeleton height={24} count={1}/>
      </div>
    </div>
  )

  return (
    <div className={styles.productsSkeleton}>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
    </div>
  )
}

export default ProductsSkeleton;
