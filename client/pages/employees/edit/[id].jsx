import React, { useId } from "react";
import { Formik, Form, Field } from "formik";
import PrincipalLayout from "~/layout/PrincipalLayout";
import NavBar from "~/components/NavBar/NavBar";
import styles from "./edit.module.scss";
import ButtonsNavBar from "~/components/ButtonsNavBar/ButtonsNavBar";
import ImageField from "~/components/ImageField/ImageField";
import TextField from "~/components/TextField/TextField";
import Edit from "~/validators/Employee/Edit";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { agent } from "~/agent";
import Loading from "~/components/Loading/Loading";
import { ErrorModal } from "~/components/ErrorModal/ErrorModal";
import { useRouter } from "next/router";
import { FormSkeleton } from "~/components/FormSkeleton/FormSkeleton";
import { requiredEmployee } from "~/helpers/requiredEmployee";
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_VENDOR } from "~/constants/employeeTypes";

function Index({employeeId}) {
  const idForm = useId();

  const router = useRouter();

  const { data: employee, isLoading } = useQuery({
    queryKey: ["employee"],
    queryFn: ()=> agent.Employee.getById(employeeId),
  });

  const [changedForm, setChangedForm] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [openedModalError, setOpenedModalError] = useState(false);

  const queryClient = useQueryClient();

  const updateEmployeeMutation = useMutation({
    mutationKey: ["updateEmployee"],
    mutationFn: async (data)=> {
      let imageURL = employee.imageURL;

      if(image) {
        imageURL = await agent.Image.upload(image).url;
      }

      await agent.Employee.update({...employee, ...data, imageURL});
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
    <PrincipalLayout title={"Editar empleado"}>
      {/* Create form */}
      <ErrorModal 
        message={error ? error.message : null} 
        visible={openedModalError} 
        onClose={()=> setOpenedModalError(false)}/>
      <Loading 
        label="Guardando cambios" 
        visible={updateEmployeeMutation.isLoading}/>
      {isLoading ? 
      <FormSkeleton/> :
        <Formik
          initialValues={{
            name: employee.name,
            surname: employee.surname,
            email: employee.email,
            nroDocument: employee.nroDocument,
            birthDate: employee.birthDate,
            type: employee.type,
            phone: employee.phone,
            accessCode: "********"
          }}
          validationSchema={Edit}
          onSubmit={(values) => {
            if(!updateEmployeeMutation.isLoading) {
              updateEmployeeMutation.mutate({
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
          {({errors, values, initialValues, touched})=> {

            React.useEffect(()=> {
              const equals = JSON.stringify(values) === JSON.stringify(initialValues);
              setChangedForm(equals ? false : true);
            }, [values]);

            return (
              <Form id={`${idForm}-createEmployee`} className={styles.form} 
              style={{width: "100%", display: "flex", flexDirection: "column", gap: "12px"}}>
                {console.log("paso")}
                <ImageField 
                  alt="product image" 
                  src={employee.imageURL}
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
                {console.log(values)}
                <TextField title={"Nombre"} type={"text"} name={"name"} />
                <TextField title={"Apellido"} type={"text"} name={"surname"} />
                <TextField title={"Correo"} type={"text"} name={"email"} />
                <TextField title={"Numero de documento"} type={"text"} name={"nroDocument"} />
                <TextField title={"Fecha de nacimiento"} type={"date"} name={"birthDate"} />
                <TextField title={"Numero de telefono"} type={"text"} name={"phone"} />
                <TextField title={"Codigo de acceso"} type={"text"} name={"accessCode"} disabled/>
                <NavBar>  
                  <ButtonsNavBar
                    title={"Guardar"}
                    type="submit"
                    height={"45%"}
                    disabled={!changedForm || Object.keys(errors).length}
                    form={`${idForm}-createEmployee`}
                  />
                </NavBar>
              </Form>
            )
          }}
        </Formik>}
    </PrincipalLayout>
  );
}

export default Index;

export const getServerSideProps = requiredEmployee((employee, ctx)=> {

  
  if((employee.type === EMPLOYEE_TYPE_ADMIN ||
    employee.type === EMPLOYEE_TYPE_VENDOR)) {
    return {props: {employee, employeeId: ctx.params.id}};
  }

  return {props: {}, redirect: {destination: "/home"}};
});
