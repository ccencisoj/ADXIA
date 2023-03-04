import React, { useId } from "react";
import View from "./View";

function TextAreaField({ title, name, value, cols, rows, onChange, onBlur }) {
  const idField = useId();
  return (
    <View
      title={title}
      id={`${idField}-${name}`}
      name={name}
      value={value}
      cols={cols}
      rows={rows}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default TextAreaField;
