import clsx from "clsx";
import React from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import Button from "~/components/Button/Button";
import ClientCard from "~/components/ClientCard/ClientCard";
import { DialogModal } from "~/components/DialogModal/DialogModal";
import { useOrder } from "~/contexts/orderContext";
import { NothingMessage } from "~/components/NothingMessage/NothingMessage";

function View({clients, onSelectClient, inEdit}) {
  const { selectedClient } = useOrder();
  const [order, setOrder] = React.useState(null);
  const [openedError, setOpenedError] = React.useState(false);

  const router = useRouter();

  return (Array.isArray(clients) && clients.length)  ?
    <div className={styles.clients}>
      <DialogModal 
        visible={openedError}
        title="Alerta" 
        message="Este cliente ya tiene un pedido" 
        actions={
          <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
            <Button 
              primary 
              title="Editar pedido"
              onClick={()=> router.push(`/orders/edit/${order.id}`)}/>
            <Button 
              light 
              title="Cerrar alerta"
              onClick={()=> setOpenedError(false)}/>
          </div>
        }/>
      {clients.map((client)=> {

        const EditClientCard = ()=> (
          <div 
            key={client.id}
            className={clsx({
            [styles.clientCard]: true
          })}
            onClick={()=> {
              onSelectClient(client);
            }}>          
            <ClientCard clientData={client}/>
          </div>
        )

        const AddClientCard = ()=> (
          <div 
            key={client.id}
            className={clsx({
            [styles.clientCard]: true,
          })}
            onClick={()=> {
              onSelectClient(client);
            }}>          
            <ClientCard clientData={client}/>
          </div>
        )
        return (
          <div style={{width: "100%"}} key={client.id}>
            {inEdit ? <EditClientCard/> : <AddClientCard/>}
          </div>
        )
      })}
    </div> :
  <NothingMessage message="No hay clientes"/>
}

export default View;
