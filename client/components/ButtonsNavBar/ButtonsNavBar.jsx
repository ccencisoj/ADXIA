import React from "react";
import View from "./View";
import { useRouter } from "next/router";

function ButtonsNavBar({ title, height, onClick, onCancel, form, type, disabled }) {
  const router = useRouter();

  return (
    <View
      title={title}
      onCancel={()=> {
        onCancel ? onCancel() : router.back()
      }}
      onClick={onClick}
      form={form}
      type={type}
      disabled={disabled}
    />
  );
}

export default ButtonsNavBar;
