import React from "react";
import { Formik, Form } from "formik";
import { X } from "react-feather";
import ImageField from "../ImageField/ImageField";
import TextField from "../TextField/TextField";
import TextAreaField from "../TextAreaField/TextAreaField";
import styles from "./styles.module.scss";
import Button from "../Button/Button";

function View({changeStateModal}) {
  return (
    <section className={styles.dropDownContainer}>
      <Formik
        initialValues={{
          presentation: "",
          description: "",
          quantity: "",
          price: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleBlur, handleChange, values }) => (
          <Form className={styles.formContainer} autoComplete="off">
            <X width={23} height={23} className={styles.icon} onClick={changeStateModal} />
            <ImageField alt={"product image"} />
            <TextField
              title={"Presentación del producto (gramos)"}
              type={"number"}
              name="presentation"
            />
            <TextAreaField
              title={"Descripción"}
              name={"description"}
              value={values.description}
              rows={5}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <TextField title={"Cantidad"} type="number" name={"quantity"} />
            <TextField title={"Precio"} type={"number"} name={"price"} />
            <Button title={"Añadir"} type="submit" />
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default View;
