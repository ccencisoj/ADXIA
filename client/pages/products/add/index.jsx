import React, { useId } from "react";
import { Formik, Form } from "formik";
import PrincipalLayout from "~/layout/PrincipalLayout";
import NavBar from "~/components/NavBar/NavBar";
import styles from "./add.module.scss";
import ButtonsNavBar from "~/components/ButtonsNavBar/ButtonsNavBar";
import ImageField from "~/components/ImageField/ImageField";
import TextField from "~/components/TextField/TextField";
import CreateEdit from "~/validators/Product/Create-Edit";
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

  const createProductMutation = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: async (data)=> {
      const imageURL = (await agent.Image.upload(image)).url;

      await agent.Product.create({...data, imageURL});
    },
    onSuccess: ()=> {
      queryClient.invalidateQueries("products");

      router.back();
    },
    onError: (requestError)=> {
      const error = requestError.response.data;

      setError(error);
      
      setOpenedModalError(true);
    }
  })

  return (
    <PrincipalLayout title={"Nuevo producto"}>
      {/* Create form */}
      <ErrorModal 
        message={error ? error.message : null} 
        visible={openedModalError} 
        onClose={()=> setOpenedModalError(false)}/>
        
      <Loading 
        label="Creando producto" 
        visible={createProductMutation.isLoading}/>
      <Formik
        initialValues={{
          name: "",
          brand: "",
          avaliableQuantity: "0",
          price: "0",
          description: "",
          grammage: "0"
        }}
        validationSchema={CreateEdit}
        onSubmit={(values) => {
          if(!createProductMutation.isLoading) {
            createProductMutation.mutate({
              name: values.name,
              brand: values.brand,
              avaliableQuantity: values.avaliableQuantity,
              price: values.price,
              description: values.description,
              grammage: values.grammage
            })
          }
        }}
      >
        {({errors, touched})=> (
          <Form id={`${idForm}-createProduct`} className={styles.form} 
          style={{width: "100%", display: "flex", flexDirection: "column", gap: "12px"}}>
            <ImageField 
              alt="product image" 
              onImage={(image)=> setImage(image)}/>
            <TextField title={"Nombre"} type={"text"} name={"name"} />
            <TextField title={"Marca"} type={"text"} name={"brand"} />
            <TextField title={"Cantidad disponible"} type={"number"} name={"avaliableQuantity"} />
            <TextField title={"Precio"} type={"number"} name={"price"} />
            <TextField title={"Descripcion"} type={"text"} name={"description"} />
            <TextField title={"Gramaje (g)"} type={"number"} name={"grammage"} />
            <NavBar>  
              <ButtonsNavBar
                title={"Crear"}
                type="submit"
                height={"45%"}
                disabled={!Object.keys(touched).length || !(image) || Object.keys(errors).length}
                form={`${idForm}-createProduct`}
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
