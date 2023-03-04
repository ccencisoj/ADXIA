import React from "react";
import styles from './styles.module.scss';
import { Portal } from "~/components/Portal/Portal";

function View({ label, visible }) {

  const sxLoading = {
    transition: "300ms ease 0s",
    opacity: visible ? "100%" : "0%",
    visibility: visible ? "visible" : "hidden"
  }

  return (
    <Portal>
      <div className={styles.loading} style={sxLoading}>
        <div className={styles.container}>
          <div className={styles.circle}></div>
          <p className={styles.label}>{label}</p>
        </div>
      </div>
    </Portal>
  )
}

export default View;
