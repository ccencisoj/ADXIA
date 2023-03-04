import React from 'react'
import useModal from '~/hooks/useModal'
import View from './View'

function OrdersCard({ orderData, options }) {
  const {isOpen, showModal} = useModal();
  return (
    <View 
      orderData={orderData} 
      moreOption={showModal} 
      stateModal={isOpen} 
      options={options}/>
  )
}

export default OrdersCard