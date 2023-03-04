import React from "react";
import styles from "./styles.module.scss";
import Skeleton from "react-loading-skeleton";

function View() {

  const ImageSkeleton = ()=> (
    <div className={styles.imageSkeleton}>
      <Skeleton width="100%" height={120}/>
    </div>
  )

  const FieldSkeleton = ()=> (
    <div className={styles.fieldSkeleton}>
      <Skeleton width="30%" height={20}/>
      <Skeleton height={56}/>
    </div>
  )

  return (
    <div className={styles.formSkeleton}>
      <ImageSkeleton/>
      <FieldSkeleton/>
      <FieldSkeleton/>
      <FieldSkeleton/>
      <FieldSkeleton/>
    </div>
  )
}

export default View;
