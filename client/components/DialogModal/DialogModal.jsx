import React from "react";
import View from "./View";

function DialogModal({title, message, visible, actions}) {
  return (
    <View title={title} message={message} visible={visible} actions={actions}/>
  )
}

export { DialogModal };
