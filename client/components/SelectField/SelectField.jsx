import React from "react";
import View from "./View";

function SelectField({defaultValue, options, field, form, readOnly}) {
  return (
    <View 
      defaultValue={defaultValue}
      options={options} 
      field={field}
      form={form}
      readOnly={readOnly}/>
  )
}

export { SelectField };
