import React from "react";
import styles from "./styles.module.scss";

function View({ title, name, value, id, cols, rows, onChange, onBlur }) {
  return (
    <label htmlFor={id} className={styles.textFieldContainer}>
      {title}
      <textarea
        name={name}
        value={value}
        id={id}
        cols={cols}
        rows={rows}
        onChange={onChange}
        onBlur={onBlur}
      ></textarea>
    </label>
  );
}

export default View;
