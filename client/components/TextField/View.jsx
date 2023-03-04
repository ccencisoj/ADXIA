import React from "react";
import styles from "./styles.module.scss";
import { Field, ErrorMessage } from "formik";
import { SelectField } from "~/components/SelectField/SelectField";

export default function View({ 
  type, 
  name,
  title, 
  id, 
  disabled, 
  readOnly, 
  defaultValue, 
  selectables
}) {

  return (
    <div className={styles.container}>
      <label htmlFor={id}>{title}</label>
      {
        selectables ? 
        <>
          <Field
            type={type}
            name={name}
            id={id}
            className={styles.input}
            disabled={disabled}
            readOnly={readOnly}
            component={SelectField}
            defaultValue={defaultValue}
            options={selectables}
          />
        </>
        :
        <>
          <Field
            type={type}
            name={name}
            id={id}
            as="input"
            autoComplete="off"
            className={styles.input}
            disabled={disabled}
            readOnly={readOnly}
          />
          <ErrorMessage
            name={name}
            component="div"
            className={styles.ErrorMessage}
          />
        </> 
      }
    </div>
  );
}
