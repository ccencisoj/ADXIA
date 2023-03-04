import React from "react";
import * as ReactDOM from "react-dom";
import ModalOptions from "../ModalOptions/ModalOptions";
import { MoreVertical, Edit3, Trash } from "react-feather";
import style from "./styles.module.scss";
import OptionsModalCard from "~/components/OptionsModalCard/OptionsModalCard";
import { useMutation, useQueryClient } from "react-query";
import { agent } from "~/agent";
import { useRouter } from "next/router";
import { Portal } from "~/components/Portal/Portal";

function View({ orderData, moreOption, stateModal, options }) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const deleteOrderMutation = useMutation({
    mutationKey: ["deleteOrder"],
    mutationFn: agent.Order.delete,
    onSuccess: ()=> {
      queryClient.invalidateQueries("orders");
      queryClient.invalidateQueries("products");
      queryClient.invalidateQueries("ordersClients");
    }
  });

  return (
    <>
      <ModalOptions changeStateModal={moreOption} visible={stateModal}>
        <OptionsModalCard 
          icon={<Edit3 size={28}/>} 
          message="Editar pedido"
          onClick={()=> router.push(`/orders/edit/${orderData.id}`)}/>
        <OptionsModalCard 
          icon={<Trash size={28}/>} 
          message="Eliminar pedido"
          onClick={()=> deleteOrderMutation.mutate(orderData)}/>
      </ModalOptions>
      <div className={style.orderCard} 
        onClick={()=> router.push(`/orders/view/${orderData.id}`)}>
        <div className={style.clientInfo}>
          <img className={style.image} src={orderData.client.imageURL} alt="client image"/>
          <div className={style.info}>
            <p className={style.name}>{orderData.client.name}</p>
            <p className={style.business}>{orderData.client.business}</p>
          </div> 
          {options ? 
            <div className={style.options} onClick={(ev)=> {
              ev.stopPropagation();
            }}>
              <MoreVertical onClick={moreOption}/> 
            </div>
          : null}
        </div>
        <div className={style.sectionInfo}>
          <div className={style.row}>
            <p className={style.label}>Total:</p>
            <p className={style.value}>${orderData.total}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
