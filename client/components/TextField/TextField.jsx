import React, { useId } from "react";
import View from "./View";

function TextField({ type, name, title, disabled, readOnly, defaultValue, selectables }) {
  const id = useId();
  return (
    <View
      type={type}
      name={name}
      title={title}
      id={`${id}-${name}`}
      disabled={disabled}
      readOnly={readOnly}
      defaultValue={defaultValue}
      selectables={selectables}
    />
  );
}

export default TextField;
