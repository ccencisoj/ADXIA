import React from "react";
import styles from './styles.module.scss';
import OrdersCard from "~/components/OrdersCard/OrdersCard";
import { NothingMessage } from "~/components/NothingMessage/NothingMessage";
import { useEmployee } from "~/contexts/employeeContext";
import { EMPLOYEE_TYPE_DELIVERER } from "~/constants/employeeTypes";

function View({ orders }) {
  const { employee } = useEmployee();

  return (Array.isArray(orders) && orders.length) ?
    <div className={styles.orders}>
      {orders.map((order)=> (
        <OrdersCard 
          key={order.id} 
          orderData={order} 
          options={employee.type === EMPLOYEE_TYPE_DELIVERER ? false : true}/>      
        ))}
    </div> :
  <NothingMessage message="No hay pedidos"/>
}

export default View;
