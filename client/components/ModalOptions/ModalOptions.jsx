import React from 'react';
import View from './View';

function ModalOptions({visible, changeStateModal, children}) {
  return (
    <View visible={visible} onClickBackground={changeStateModal}>
      {children}
    </View>
  )
}

export default ModalOptions