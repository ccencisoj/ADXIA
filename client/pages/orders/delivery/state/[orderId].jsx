import React, { useState } from 'react';
import { useId } from 'react';
import styles from './state.module.scss';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import PrincipalLayout from '@/layout/PrincipalLayout';
import { useRouter } from 'next/router';
import OrdersCard from '~/components/OrdersCard/OrdersCard';
import { agent } from '~/agent';
import { FormSkeleton } from '~/components/FormSkeleton/FormSkeleton';
import { Field, Form, Formik } from 'formik';
import TextField from '~/components/TextField/TextField';
import NavBar from '~/components/NavBar/NavBar';
import ButtonsNavBar from '~/components/ButtonsNavBar/ButtonsNavBar';
import { getDateNow } from '~/helpers/getDateNow';
import { ErrorModal } from '~/components/ErrorModal/ErrorModal';
import Loading from '~/components/Loading/Loading';
import { requiredEmployee } from '~/helpers/requiredEmployee';
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_DELIVERER, EMPLOYEE_TYPE_VENDOR } from '~/constants/employeeTypes';

function Id({employee, orderId}) {
  const [changedForm, setChangedForm] = useState(false);
  const [error, setError] = useState(null);
  const [openedModalError, setOpenedModalError] = useState(false);

  const deliveredAt = getDateNow();

  const idForm = useId();

  const router = useRouter();

  const queryClient = useQueryClient();

  const updateOrderMutation = useMutation({
    mutationKey: ["updateOrder"],
    mutationFn: async (values)=> {
      await agent.Order.update({id: order.id, ...values});
    },
    onSuccess: ()=> {
      queryClient.invalidateQueries("order");
      queryClient.invalidateQueries("orders");
      
      router.push("/orders");
    },
    onError: (requestError)=> {
      const error = requestError.response.data;

      setError(error);
      
      setOpenedModalError(true);
    }
  })

  const { data: order, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: ()=> agent.Order.getById(orderId)
  });


  console.log(order);

  return (
    <>
      <ErrorModal 
        message={error ? error.message : null} 
        visible={openedModalError} 
        onClose={()=> setOpenedModalError(false)}/>
      <Loading 
        label="Guardando cambios"
        visible={updateOrderMutation.isLoading}/>
      <PrincipalLayout 
        title={'Estado de entrega'} 
        className={styles.layout}>
        {
          isLoading ? 
          <FormSkeleton/> :
          <Formik
          enableReinitialize
          initialValues={{
            deliveryState: order.deliveryState,
            deliveredAt: order.deliveredAt || deliveredAt
          }}
          onSubmit={(values) => {
            if(!updateOrderMutation.isLoading) {
              updateOrderMutation.mutate({
                deliveryState: values.deliveryState,
                deliveredAt: values.deliveredAt
              })
            }
          }}
        >
          {({values, initialValues, errors})=> {

            React.useEffect(()=> {
              const equals = JSON.stringify(values) === JSON.stringify(initialValues);
              setChangedForm(equals ? false : true);
            }, [values]);

            return (
              <Form id={`${idForm}-createEmployee`} className={styles.form} 
              styles={{width: "100%", display: "flex", flexDirection: "column", gap: "12px"}}>
                <div className={styles.orderCard}>
                  <OrdersCard orderData={order}/>
                </div>
                <TextField 
                  readOnly={employee.type === EMPLOYEE_TYPE_VENDOR}
                      title={"Estado"} type={"text"} name={"deliveryState"}
                      defaultValue={{label: "Entregado", value: "DELIVERED"}}
                      selectables={[
                        {label: "No entregado", value: "NO_DELIVERED"},
                        {label: "Entregado", value: "DELIVERED"}
                    ]}
                  />
                {(values.deliveryState === "DELIVERED") ? 
                  <TextField 
                    readOnly={true}
                    title={"Fecha de entrega"} 
                    type={"date"} 
                    name={"deliveredAt"}
                  />
                : null}
                {(employee.type === EMPLOYEE_TYPE_ADMIN ||
                  employee.type === EMPLOYEE_TYPE_DELIVERER) ? 
                  <NavBar>  
                    <ButtonsNavBar
                      title={"Guardar"}
                      type="submit"
                      height={"45%"}
                      disabled={!changedForm || Object.keys(errors).length}
                      form={`${idForm}-createEmployee`}
                    />
                  </NavBar> : null}
              </Form>
            )
          }}
        </Formik>
        }
      </PrincipalLayout>
    </>
  )
}

export default Id;

export const getServerSideProps = requiredEmployee((employee, ctx)=> {

  return {props: {employee, orderId: ctx.params.orderId}}
});
