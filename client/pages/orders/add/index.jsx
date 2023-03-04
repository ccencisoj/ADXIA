import React, { useState } from 'react';
import Link from 'next/link';
import { User, X } from 'react-feather';
import PrincipalLayout from '@/layout/PrincipalLayout';
import NavBar from '@/components/NavBar/NavBar';
import style from './add.module.scss';
import { useIsFetching, useMutation, useQueryClient } from 'react-query';
import ButtonsNavBar from '~/components/ButtonsNavBar/ButtonsNavBar';
import { OrderProducts } from '~/components/OrderProducts/OrderProducts';
import { useOrder } from '~/contexts/orderContext';
import ClientCard from '~/components/ClientCard/ClientCard';
import { agent } from '~/agent';
import Loading from '~/components/Loading/Loading';
import { useRouter } from 'next/router';
import { ErrorModal } from '~/components/ErrorModal/ErrorModal';

function Index() {
  const { client, products, total, setSelectedClient } = useOrder();

  const router = useRouter();

  const queryClient = useQueryClient();

  const [error, setError] = useState(null);
  const [openedModalError, setOpenedModalError] = useState(false);

  const createOrderMutation = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: agent.Order.create,
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
      title={'Agregar pedido'} 
      className={style.layout}
      backHref="/orders">
      <ErrorModal 
        message={error ? error.message : null} 
        visible={openedModalError} 
        onClose={()=> setOpenedModalError(false)}/>
      <Loading 
        label="Creando pedido"
        visible={createOrderMutation.isLoading}/>
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
            addHref="/orders/add/select/product" 
            editHref="/orders/add/select/product/details"/>
        </div>
        <NavBar>
          <div className={style.navBarContainer}>
            <div className={style.infoOrder}>
              <span>Total</span>
              <h1>${total}</h1>
            </div>
            <ButtonsNavBar 
              type={'submit'} 
              title={'Agregar'} 
              height={'35%'}
              disabled={!client || !products.length}
              onClick={()=> {
                createOrderMutation.mutate({client, products});
              }}
            />
          </div>
        </NavBar>
    </PrincipalLayout>
  )
}

export default Index