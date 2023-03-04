import React, { useId } from "react";
import { Formik, Form, Field } from "formik";
import PrincipalLayout from "~/layout/PrincipalLayout";
import NavBar from "~/components/NavBar/NavBar";
import styles from "./add.module.scss";
import ButtonsNavBar from "~/components/ButtonsNavBar/ButtonsNavBar";
import ImageField from "~/components/ImageField/ImageField";
import TextField from "~/components/TextField/TextField";
import Create from "~/validators/Employee/Create";
import { useState } from "react";
import { useMutation, useQueryClient, useIsMutating } from "react-query";
import { agent } from "~/agent";
import Loading from "~/components/Loading/Loading";
import { ErrorModal } from "~/components/ErrorModal/ErrorModal";
import { useRouter } from "next/router";
import { requiredEmployee } from "~/helpers/requiredEmployee";
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_VENDOR } from "~/constants/employeeTypes";

function Index() {
  const idForm = useId();

  const router = useRouter();

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [openedModalError, setOpenedModalError] = useState(false);

  const queryClient = useQueryClient();

  const createEmployeeMutation = useMutation({
    mutationKey: ["createEmployee"],
    mutationFn: async (data)=> {
      const imageURL = (await agent.Image.upload(image)).url;

      await agent.Employee.create({...data, imageURL});
    },
    onSuccess: ()=> {
      queryClient.invalidateQueries("employees");

      router.back();
    },
    onError: (requestError)=> {
      const error = requestError.response.data;

      setError(error);
      
      setOpenedModalError(true);
    }
  })

  return (
    <PrincipalLayout title={"Nuevo empleado"}>
      {/* Create form */}
      <ErrorModal 
        message={error ? error.message : null} 
        visible={openedModalError} 
        onClose={()=> setOpenedModalError(false)}/>
      <Loading 
        label="Creando empleado" 
        visible={createEmployeeMutation.isLoading}/>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          nroDocument: "",
          birthDate: "",
          type: "VENDOR",
          accessCode: "",
          phone: ""
        }}
        validationSchema={Create}
        onSubmit={(values) => {
          if(!createEmployeeMutation.isLoading) {
            createEmployeeMutation.mutate({
              name: values.name,
              surname: values.surname,
              email: values.email,
              nroDocument: values.nroDocument,
              birthDate: values.birthDate,
              imageURL: values.imageURL,
              type: values.type,
              accessCode: values.accessCode,
              phone: values.phone
            })
          }
        }}
      >
        {({errors, touched})=> (
          <Form id={`${idForm}-createEmployee`} className={styles.form} 
          style={{width: "100%", display: "flex", flexDirection: "column", gap: "12px"}}>
            <ImageField 
              alt="product image" 
              onImage={(image)=> setImage(image)}/>
            <TextField 
                title={"Rol"} type={"text"} name={"type"}
                defaultValue={{label: "Vendedor", value: "VENDOR"}}
                selectables={[
                  {label: "Vendedor", value: "VENDOR"},
                  {label: "Administrador", value: "ADMIN"},
                  {label: "Entregador", value: "DELIVERER"}
              ]}
            />
            <TextField title={"Nombre"} type={"text"} name={"name"} />
            <TextField title={"Apellido"} type={"text"} name={"surname"} />
            <TextField title={"Correo"} type={"text"} name={"email"} />
            <TextField title={"Numero de documento"} type={"text"} name={"nroDocument"} />
            <TextField title={"Fecha de nacimiento"} type={"date"} name={"birthDate"} />
            <TextField title={"Numero de telefono"} type={"text"} name={"phone"} />
            <TextField title={"Codigo de acceso"} type={"text"} name={"accessCode"} />
            {console.log(errors)}
            <NavBar>  
              <ButtonsNavBar
                title={"Crear"}
                type="submit"
                height={"45%"}
                disabled={!Object.keys(touched).length || !(image) || Object.keys(errors).length}
                form={`${idForm}-createEmployee`}
              />
            </NavBar>
          </Form>
        )}
      </Formik>
    </PrincipalLayout>
  );
}

export default Index;

export const getServerSideProps = requiredEmployee((employee)=> {
  
  if((employee.type === EMPLOYEE_TYPE_ADMIN ||
    employee.type === EMPLOYEE_TYPE_VENDOR)) {
    return {props: {employee}};
  }

  return {props: {}, redirect: {destination: "/home"}};
});
