import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

function View({
  title,
  onCancel,
  onClick,
  form,
  type,
  disabled,
  loading,
}) {

  const stylesButtonsContainers = clsx({
    [styles.buttonsContainers]: true,
    [styles.disabled]: disabled,
    [styles.loading]: loading
  })

  return (
    <div className={stylesButtonsContainers} styles={styles}>
      <button className={styles.first} onClick={onCancel}>
        Cancelar
      </button>
      <button
        type={type}
        className={styles.second}
        form={form}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
}

export default View;
