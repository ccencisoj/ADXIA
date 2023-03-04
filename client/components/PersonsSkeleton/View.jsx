import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";

function View() {
  const CardSkeleton = ()=> (
    <div className={styles.cardSkeleton}>
      <div className={styles.leftColumn}>
        <Skeleton circle width={32} height={32}/>
      </div>
      <div className={styles.rightColumn}>
        <Skeleton height={12} count={2}/>
      </div>
    </div>
  )

  return (
    <div className={styles.personsSkeleton}>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
      <CardSkeleton/>
    </div>
  )
}

export default View;
