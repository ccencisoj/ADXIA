import React, { useId } from "react";
import { Formik, Form } from "formik";
import PrincipalLayout from "~/layout/PrincipalLayout";
import NavBar from "~/components/NavBar/NavBar";
import styles from "./add.module.scss";
import ButtonsNavBar from "~/components/ButtonsNavBar/ButtonsNavBar";
import ImageField from "~/components/ImageField/ImageField";
import TextField from "~/components/TextField/TextField";
import CreateEdit from "~/validators/Client/Create-Edit";
import { useState } from "react";
import { useMutation, useQueryClient, use, useIsMutating } from "react-query";
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

  const createClientMutation = useMutation({
    mutationKey: ["createClient"],
    mutationFn: async (data)=> {
      const imageURL = (await agent.Image.upload(image)).url;

      await agent.Client.create({...data, imageURL});
    },
    onSuccess: ()=> {
      queryClient.invalidateQueries("clients");

      router.back();
    },
    onError: (requestError)=> {
      const error = requestError.response.data;

      setError(error);
      
      setOpenedModalError(true);
    }
  })

  const isCreatingClient = useIsMutating("createClient");

  return (
    <PrincipalLayout title={"Nuevo cliente"}>
      {/* Create form */}
      <ErrorModal 
        message={error ? error.message : null} 
        visible={openedModalError} 
        onClose={()=> setOpenedModalError(false)}/>
        
      <Loading label="Creando cliente" visible={isCreatingClient}/>
      <Formik
        initialValues={{
          urlImage: "",
          name: "",
          lastname: "",
          nroDoc: "",
          phone: "",
          address: "",
          business: ""
        }}
        validationSchema={CreateEdit}
        onSubmit={(values) => {
          if(!isCreatingClient) {
            createClientMutation.mutate({
              name: values.name,
              surname: values.lastname,
              nroDocument: values.nroDoc,
              phone: values.phone,
              address: values.address,
              business: values.business
            })
          }
        }}
      >
        {({errors, touched})=> (
          <Form id={`${idForm}-createClient`} className={styles.form} 
          style={{width: "100%", display: "flex", flexDirection: "column", gap: "12px"}}>
            <ImageField 
              alt="image profile of a client" 
              onImage={(image)=> setImage(image)}/>
            <TextField 
              title={"Nombres"} 
              type={"text"} 
              name={"name"} />
            <TextField 
              title={"Apellidos"} 
              type={"text"} 
              name={"lastname"} />
            <TextField
              title={"Número de documento"}
              type={"number"}
              name={"nroDoc"}
            />
            <TextField title={"Telefono"} type={"text"} name={"phone"} />
            <TextField title={"Dirección"} type={"text"} name={"address"} />
            <TextField title={"Business"} type={"text"} name={"business"} />
            <NavBar>  
              <ButtonsNavBar
                title={"Crear"}
                type="submit"
                height={"45%"}
                disabled={!Object.keys(touched).length || !(image) || Object.keys(errors).length}
                form={`${idForm}-createClient`}
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