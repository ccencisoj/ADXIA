import React from "react";
import View from "./View";

function OrderProducts({addHref, editHref, readOnly}) {
  return (
    <View addHref={addHref} editHref={editHref} readOnly={readOnly}/>
  )
}

export { OrderProducts };
