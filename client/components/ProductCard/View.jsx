import React from "react";
import { MoreHorizontal, ChevronDown, Edit3, Trash } from "react-feather";
import style from "./styles.module.scss";
import ModalOptions from "../ModalOptions/ModalOptions";
import OptionsModalCard from "../OptionsModalCard/OptionsModalCard";
import { useMutation, useQueryClient } from "react-query";
import { agent } from "~/agent";

function View({
  productData,
  stateModal,
  methodChangeStateModal,
  options,
  styles,
  onClick
}) {

  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: agent.Product.delete,
    onSuccess: ()=> {
      queryClient.invalidateQueries("products")
    }
  });
  
  return (
    <>
      <ModalOptions changeStateModal={methodChangeStateModal} visible={stateModal}>
        <OptionsModalCard
          href={`/products/edit/${productData.id}`}
          icon={<Edit3 width={27} height={27} />}
          message="Editar producto"
        />
        <OptionsModalCard
          icon={<Trash width={27} height={27} />}
          message="Eliminar producto"
          onClick={()=> deleteProductMutation.mutate(productData)}
        />
      </ModalOptions>
      <div className={style.cardProduct} style={styles} onClick={onClick}>
        <header className={style.imageInfo}>
          <img
            className={style.imageURL}
            src={productData.imageURL}
            alt="leche clean"
          />
          {options ? (
            <div className={style.options} onClick={(ev)=> {
              ev.stopPropagation();
            }}>
              <MoreHorizontal color="#000" onClick={methodChangeStateModal} />
            </div>
          ) : null}
        </header>
        <span className={style.resumeInfo}>
          {`${productData.name} x${productData.grammage}`}
        </span>
        <footer className={style.priceInfo}>
          <h1>${productData.price}</h1>
          <div>
            <span>Cantidad: {productData.avaliableQuantity}</span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default View;
