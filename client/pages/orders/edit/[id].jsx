import React, { useState } from 'react';
import Link from 'next/link';
import { User, X } from 'react-feather';
import PrincipalLayout from '@/layout/PrincipalLayout';
import NavBar from '@/components/NavBar/NavBar';
import style from './edit.module.scss';
import { useIsFetching, useMutation, useQueryClient } from 'react-query';
import ButtonsNavBar from '~/components/ButtonsNavBar/ButtonsNavBar';
import { OrderProducts } from '~/components/OrderProducts/OrderProducts';
import { useOrder } from '~/contexts/orderContext';
import ClientCard from '~/components/ClientCard/ClientCard';
import { agent } from '~/agent';
import Loading from '~/components/Loading/Loading';
import { useRouter } from 'next/router';
import { ErrorModal } from '~/components/ErrorModal/ErrorModal';
import { FormSkeleton } from '~/components/FormSkeleton/FormSkeleton';
import { requiredEmployee } from '~/helpers/requiredEmployee';
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_DELIVERER, EMPLOYEE_TYPE_VENDOR } from '~/constants/employeeTypes';

function Index({orderId}) {
  const { client, products, order, total, setOrder, setSelectedClient } = useOrder();

  const orderFetching = async ()=> {
    if(!order) {
      const order = await agent.Order.getById(orderId);

      setOrder(order);  
    }
  }

  React.useEffect(()=> { orderFetching() }, []);

  const router = useRouter();

  const queryClient = useQueryClient();

  const [error, setError] = useState(null);
  const [openedModalError, setOpenedModalError] = useState(false);

  const updateOrderMutation = useMutation({
    mutationKey: ["updateOrder"],
    mutationFn: agent.Order.update,
    onSuccess: ()=> {
      queryClient.invalidateQueries("orders");
      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries("ordersClients");
      
      router.push("/orders");
    },
    onError: (requestError)=> {
      const error = requestError.response.data;

      setError(error);
      
      setOpenedModalError(true);
    }
  })

  return (
    <PrincipalLayout 
      title={'Editar pedido'} 
      className={style.layout} backHref="/orders">
      {!order ? 
      <FormSkeleton/> :
      <>
        <ErrorModal 
          message={error ? error.message : null} 
          visible={openedModalError} 
          onClose={()=> setOpenedModalError(false)}/>
        <Loading 
          label="Guardando cambios"
          visible={updateOrderMutation.isLoading}/>
        {client ? 
          <div className={style.client}>
            <ClientCard clientData={client}/>
            <button className={style.close} onClick={()=> setSelectedClient(null)}>
              <X className={style.icon} size={24}/>
            </button>
          </div>
          :
          <Link href={'/orders/add/select/client'}>
            <div className={style.addClientCard}>
              <div className={style.iconContainer}>
                <User color='#ffff' width={30} height={30}/>
              </div>
              <div className={style.infoContainer}>
                <h3>Seleccionar cliente</h3>
                <span>Debes seleccionar un cliente para agregar un pedido</span>
              </div>
            </div>
          </Link>}
          <div className={style.productBastket}>
            <h1>Cesta de productos</h1>
            <OrderProducts 
              addHref="/orders/edit/select/product" 
              editHref="/orders/edit/select/product/details"/>
          </div>
          <NavBar>
            <div className={style.navBarContainer}>
              <div className={style.infoOrder}>
                <span>Total</span>
                <h1>${total}</h1>
              </div>
              <ButtonsNavBar 
                type={'submit'} 
                title={'Guardar'} 
                height={'35%'}
                onCancel={()=> router.push("/orders")}
                disabled={!client || !products.length}
                onClick={()=> {
                  updateOrderMutation.mutate({...order, clientId: client.id, products});
                }}
              />
            </div>
          </NavBar>
        </>}
    </PrincipalLayout>
  )
}

export default Index;

export const getServerSideProps = requiredEmployee((employee, ctx)=> {

  if(!(employee.type === EMPLOYEE_TYPE_DELIVERER ||
    employee.type === EMPLOYEE_TYPE_ADMIN ||
    employee.type === EMPLOYEE_TYPE_VENDOR)) {
      return {props: {}, redirect: {destination: "/login"}};
    }

  return {props: {orderId: ctx.query.id}};
})
