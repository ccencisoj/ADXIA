import React from 'react';
import View from './View';
import useModal from '~/hooks/useModal';

function ProductCard({productData, options, border, onClick}) {
  const {isOpen, showModal} = useModal();

  const styles = {
    border: '1px solid #E5E5EE',
    borderRadius: 10,
    padding: '10px 0px'
  }
  return (
    <View 
      onClick={onClick}
      productData={productData} 
      stateModal={isOpen} 
      methodChangeStateModal={showModal} 
      options={options} 
      styles={border?styles:{}}/>
  )
}

export default ProductCard