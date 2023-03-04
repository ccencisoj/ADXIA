import clsx from "clsx";
import React from "react";
import styles from './styles.module.scss';
import Button from "~/components/Button/Button";
import { Portal } from "~/components/Portal/Portal";

function View({ title, message, visible, onClose }) {

  const stylesErrorModal = clsx({
    [styles.errorModal]: true,
    [styles.visible]: visible,
    [styles.hidden]: !visible
  });

  return (
    <Portal>
      <div className={stylesErrorModal}>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.title}>{title || "Error"}</p>
          </div>
          <div className={styles.main}>
            <p className={styles.message}>{message}</p>
          </div>
          <div className={styles.footer}>
            <Button 
              title="Cerrar error"
              onClick={()=> onClose()}/>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default View;
