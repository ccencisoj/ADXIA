import React from "react";
import { Formik, Form } from "formik";
import style from "./login.module.scss";
import { useRouter } from "next/router";
import Figure from '@/assets/images/Group.svg'
import Login from '~/validators/Employee/Login';
import Button from "~/components/Button/Button";
import DefaultLayout from "@/layout/DefaultLayout";
import Loading from "~/components/Loading/Loading";
import TextField from "@/components/TextField/TextField";
import FigureBackground from "@/components/FigureBackground/FigureBackground";
import { getEmployeeFromRequest } from "~/helpers/getEmployeeFromRequest";
import { useIsMutating, useMutation } from "react-query";
import { agent } from "~/agent";
import { Portal } from "~/components/Portal/Portal";

export default function Index() {
  const router = useRouter();

  React.useEffect(()=> {
    router.prefetch("/home");
  }, []);

  const loginEmployeeMutation = useMutation({
    mutationKey: ["loginEmployee"],
    mutationFn: agent.Employee.login,
    onSuccess: ()=> {
      router.push("/home");
    }
  })

  return (
    <DefaultLayout className={style.fatherContainer}>
      <Loading 
        label="Verificando datos.." 
        visible={loginEmployeeMutation.isLoading ? true : false}/>
      <Portal>
        <img className={style.figure1} src="/image/squares1.svg" alt="figura"/>
        <img className={style.figure2} src="/image/squares1.svg" alt="figura"/>
      </Portal>
      <div className={style.formContainer}>
        <h6>Ingresar a la plataforma</h6>
        <h1>Hey!! ingresa los siguientes datos para ingresar</h1>
        <Formik
          initialValues={{ nroDoc: "", password: "" }}
          validationSchema={Login}
          onSubmit={(values) => {
            if(!loginEmployeeMutation.isLoading) {
              loginEmployeeMutation.mutate({
                nroDocument: values.nroDoc,
                accessCode: values.password
              })
            }
          }}
        >
          {(
            isSubmitting
          ) => (
            <Form className={style.form}>
              <div className={style.textFields}>
                <TextField
                  type="number"
                  name="nroDoc"
                  title="Número de identidad"
                />
                <TextField
                  type="password"
                  name="password"
                  title="Codigo de acceso"
                />
              </div>
              <Button title={'Ingresar'} type={'submit'}/>
            </Form>
          )}
        </Formik>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps = async ({req})=> {
  const employee = await getEmployeeFromRequest(req);
  
  if(employee) {
    return {props: {}, redirect: {destination: "/home"}}
  }

  return {props: {}};
}
