import React from 'react';
import Link from 'next/link';
import { User, X } from 'react-feather';
import PrincipalLayout from '@/layout/PrincipalLayout';
import style from './view.module.scss';
import { OrderProducts } from '~/components/OrderProducts/OrderProducts';
import { useOrder } from '~/contexts/orderContext';
import ClientCard from '~/components/ClientCard/ClientCard';
import { agent } from '~/agent';
import { FormSkeleton } from '~/components/FormSkeleton/FormSkeleton';
import { requiredEmployee } from '~/helpers/requiredEmployee';
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_DELIVERER, EMPLOYEE_TYPE_VENDOR } from '~/constants/employeeTypes';
import NavBar from '~/components/NavBar/NavBar';
import Button from '~/components/Button/Button';
import { useRouter } from 'next/router';

function Id({employee, orderId}) {
  const { client, products, order, total, setOrder, setSelectedClient } = useOrder();

  const router = useRouter();

  const orderFetching = async ()=> {
    if(!order) {
      const order = await agent.Order.getById(orderId);

      setOrder(order);  
    }
  }

  React.useEffect(()=> { orderFetching() }, []);

  return (
    <PrincipalLayout 
      title={'Ver pedido'} 
      className={style.layout} backHref="/orders">
      {!order ? 
      <FormSkeleton/> :
      <>
        {client ? 
          <div className={style.client}>
            <ClientCard 
              clientData={client} 
              onClick={()=> router.push(`/clients/view/${client.id}`)}/>
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
              readOnly={true}
              addHref="/orders/edit/select/product" 
              editHref="/orders/edit/select/product/details"/>
          </div>
          <NavBar>
            <div className={style.navBarContainer}>
              <div className={style.infoOrder}>
                <span>Total</span>
                <h1>${total}</h1>
              </div>
              <Button 
                primary={true}
                title="Ver estado de entrega"
                onClick={()=> router.push(`/orders/delivery/state/${order.id}`)}
              />
            </div>
          </NavBar>
        </>}
    </PrincipalLayout>
  )
}

export default Id;

export const getServerSideProps = requiredEmployee((employee, ctx)=> {

  if(employee.type === EMPLOYEE_TYPE_DELIVERER ||
    employee.type === EMPLOYEE_TYPE_ADMIN ||
    employee.type === EMPLOYEE_TYPE_VENDOR) {
      return {props: {employee, orderId: ctx.query.id}};
    }

  return {props: {}, redirect: {destination: "/login"}};
})
