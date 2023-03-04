import clsx from "clsx";
import React from "react";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";

const Select = dynamic(()=> import('react-select'), { ssr: false });

function View({defaultValue, options, field, form, readOnly}) {

  const stylesSelectableControl = clsx({
    [styles.selectableControl]: true,
    [styles.readOnly]: !!readOnly
  });

  return (
    <Select
      name={field.name}
      classNames={{
        control: ()=> stylesSelectableControl,
        indicatorsContainer: ()=> styles.indicatorsContainer
      }}
      classNamePrefix="select"
      isSearchable={false}
      options={options}
      defaultValue={defaultValue}
      value={options ? options.find(option => option.value === field.value) : ''}
      onChange={async (option) => {
        form.setFieldValue(field.name, option.value);        
      }}
      onBlur={field.onBlur}
    /> 
  )
}

export default View;
