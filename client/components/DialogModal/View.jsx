import clsx from "clsx";
import React from "react";
import styles from './styles.module.scss';
import { Portal } from "~/components/Portal/Portal";

function View({ title, message, visible, actions }) {

  const stylesDialogModal = clsx({
    [styles.dialogModal]: true,
    [styles.visible]: visible,
    [styles.hidden]: !visible
  });

  return (
    <Portal>
      <div className={stylesDialogModal}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.title}>{title || "Error"}</p>
          </div>
          <div className={styles.main}>
            <p className={styles.message}>{message}</p>
          </div>
          <div className={styles.footer}>
            {actions}
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default View;
