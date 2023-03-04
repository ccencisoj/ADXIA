import React from "react";
import View from "./View";

function ErrorModal({title, message, visible, onClose}) {
  return (
    <View title={title} message={message} visible={visible} onClose={onClose}/>
  )
}

export { ErrorModal };
