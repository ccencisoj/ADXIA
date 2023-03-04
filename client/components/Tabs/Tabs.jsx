import React from "react";
import View from "./View";

function Tabs({initialSelected, items}) {
  return (
    <View initialSelected={initialSelected} items={items}/>
  )
}

export { Tabs };
