import React, { useId, useState } from "react";
import { Formik, Form } from "formik";
import PrincipalLayout from "~/layout/PrincipalLayout";
import NavBar from "~/components/NavBar/NavBar";
import styles from "./edit.module.scss";
import ButtonsNavBar from "~/components/ButtonsNavBar/ButtonsNavBar";
import ImageField from "~/components/ImageField/ImageField";
import TextField from "~/components/TextField/TextField";
import CreateEdit from "~/validators/Client/Create-Edit";
import { useRouter } from "next/router";
import { useIsMutating, useMutation, useQuery, useQueryClient } from "react-query";
import { agent } from "~/agent";
import { ErrorModal } from "~/components/ErrorModal/ErrorModal";
import Loading from "~/components/Loading/Loading";
import { FormSkeleton } from "~/components/FormSkeleton/FormSkeleton";
import { requiredEmployee } from "~/helpers/requiredEmployee";
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_VENDOR } from "~/constants/employeeTypes";

function Id(props) {
  const idForm = useId();

  const router = useRouter();

  const clientId = props.clientId;

  const [changedForm, setChangedForm] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [openedModalError, setOpenedModalError] = useState(false);

  const queryClient = useQueryClient();

  const { data: client, isLoading } = useQuery({
    queryKey: ["client"],
    queryFn: ()=> agent.Client.getById(clientId)
  })

  const updateClientMutation = useMutation({
    mutationKey: ["updateClient"],
    mutationFn: async (data)=> {
      let imageURL = client.imageURL;

      if(image) {
        imageURL = await agent.Image.upload(image).url;
      }

      await agent.Client.update({...client,...data, imageURL});
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

  const isUpdatingClient = useIsMutating("updateClient");

  return (
    <PrincipalLayout title={"Editar cliente"}>
      {/* Create form */}
      <ErrorModal 
        message={error ? error.message : null} 
        visible={openedModalError} 
        onClose={()=> setOpenedModalError(false)}/>
        
      <Loading label="Guardando cambios" visible={isUpdatingClient}/>
      {isLoading ? 
      <FormSkeleton/> :
      <Formik
        initialValues={{
          urlImage: client.imageURL,
          name: client.name,
          lastname: client.surname,
          nroDoc: client.nroDocument,
          phone: client.phoneNumber,
          address: client.address,
          business: client.business
        }}
        validationSchema={CreateEdit}
        onSubmit={(values) => {
          if(!isUpdatingClient) {
            updateClientMutation.mutate({
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
        {({errors}) => (
          <Form id={`${idForm}-editClient`} className={styles.form}
          onChange={()=> setChangedForm(true)}
          style={{width: "100%", display: "flex", flexDirection: "column", gap: "12px"}}>
            <ImageField 
              alt="image profile of a client" 
              src={client.imageURL}
              onImage={(image)=> setImage(image)}/>
            <TextField title={"Nombres"} type={"text"} name={"name"} />
            <TextField title={"Apellidos"} type={"text"} name={"lastname"} />
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
                title={"Guardar"}
                type="submit"
                height={"45%"}
                disabled={!changedForm || Object.keys(errors).length}
                form={`${idForm}-editClient`}
              />
            </NavBar>
          </Form>
        )}
      </Formik>}
      {/*Nav Bar with options */}
    </PrincipalLayout>
  );
}

export default Id;

export const getServerSideProps = requiredEmployee((employee, ctx)=> {
  
  if((employee.type === EMPLOYEE_TYPE_ADMIN ||
    employee.type === EMPLOYEE_TYPE_VENDOR)) {
    return {props: {employee, clientId: ctx.params.id}};
  }

  return {props: {}, redirect: {destination: "/home"}};
});