import React from "react";
import View from "./View";

function Button({ primary, light, title, type, form, disabled, onClick }) {
  return (
    <View
      primary={primary}
      light={light}
      title={title}
      type={type}
      form={form}
      disabled={disabled}
      onClick={onClick}
    />
  );
}

export default Button;
