import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";

function View() {

  const CardSkeleton = ()=> (
    <div className={styles.cardSkeleton}>
      <div className={styles.topContainer}>
        <div className={styles.leftColumn}>
          <Skeleton circle width={48} height={48}/>
        </div>
        <div className={styles.rightColumn}>
          <Skeleton height={24} count={2}/>
        </div>
      </div>
      <div className={styles.downContainer}>
        <Skeleton height={24} count={3}/>
      </div>
    </div>
  )

  return (
    <div className={styles.ordersSkeleton}>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
    </div>
  )
}

export default View;
