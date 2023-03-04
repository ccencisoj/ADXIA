import React, { useId } from "react";
import PrincipalLayout from "~/layout/PrincipalLayout";
import ProductCard from "~/components/ProductCard/ProductCard";
import TextField from "~/components/TextField/TextField";
import NavBar from "~/components/NavBar/NavBar";
import ButtonsNavBar from "~/components/ButtonsNavBar/ButtonsNavBar";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";
import style from "./styles/id.module.scss";
import { useQuery } from "react-query";
import { agent } from "~/agent";
import { FormSkeleton } from "~/components/FormSkeleton/FormSkeleton";
import { useOrder } from "~/contexts/orderContext";

function Id() {
  const idForm = useId();

  const router = useRouter();

  const { selectedProduct, isAddedProduct, setSelectedProduct, addProduct, updateProduct } = useOrder();

  return (
    <PrincipalLayout title={"Producto"}>
      {!(selectedProduct) ?
      <FormSkeleton/> :
      <div className={style.formContainer}>
        <div className={style.productCard}>
          <ProductCard productData={{
            ...selectedProduct, 
            avaliableQuantity: selectedProduct.quantity
          }}/>
        </div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            quantity: selectedProduct.quantity,
            unidPrice: selectedProduct.price,
            totalPrice: selectedProduct.quantity * selectedProduct.price,
          }}
          validate={(values)=> {
            const errors = {};

            const quantity = Number(values.quantity);

            if((quantity >= 1) && (quantity <= selectedProduct.avaliableQuantity)) {
              setSelectedProduct({...selectedProduct, quantity});                

            }else {
              errors.quantity = "The quantity must be minimum 1 and max " + selectedProduct.avaliableQuantity;
            }

            return errors;
          }}
          onSubmit={(values)=>{
            if(isAddedProduct(selectedProduct)) {
              updateProduct(selectedProduct);

            }else {
              addProduct(selectedProduct);
            }

            router.push("/orders/add");
          }}
        >
          {({errors}) => (
            <Form className={style.form} id={idForm}
            style={{width: "100%", display: "flex", flexDirection: "column", gap: "12px"}}>
              <TextField 
                title={`Cantidad (1 - ${selectedProduct.avaliableQuantity})`} 
                type={"number"} 
                name={"quantity"} 
              />
              <TextField 
                title={"Precio unidad"} 
                name={"unidPrice"} 
                disabled/>
              <TextField
                title={"Precio total"}
                type="number"
                name={"totalPrice"}
                readOnly
              />
               <NavBar>
                <ButtonsNavBar
                  title={"Guardar"}
                  height={"50%"}
                  type={"submit"}
                  form={idForm}
                  disabled={Object.keys(errors).length}
                />
              </NavBar>
            </Form>
          )}
        </Formik>      
      </div>}
    </PrincipalLayout>
  );
}

export default Id;
