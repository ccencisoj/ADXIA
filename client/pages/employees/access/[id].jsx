import React from "react";
import { Formik, Form } from "formik";
import PrincipalLayout from "~/layout/PrincipalLayout";
import TextField from "~/components/TextField/TextField";
import styles from './access.module.scss';

function Id() {
  return (
    <PrincipalLayout title={"Credenciales de acceso"}>
      <Formik
        initialValues={{
          nroDoc: "",
          password: "",
        }}
      >
        {() => (
          <Form className={styles.form}>
            <TextField
              title={"Documento de identidad"}
              type="number"
              name={"nroDoc"}
              readOnly
            />
            <TextField
              title={"Codigo de acceso"}
              type="number"
              name={"password"}
              readOnly
            />
          </Form>
        )}
      </Formik>
    </PrincipalLayout>
  );
}

export default Id;
