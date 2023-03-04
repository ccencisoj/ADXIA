import React from 'react';
import View from './View';

function EmployeeCard({employeeData, options}) {
  const employeeTypes = {
    ["VENDOR"]: "Vendedor",
    ["ADMIN"]: "Administrador",
    ["DELIVERER"]: "Entregador"
  }

  employeeData = {
    ...employeeData,
    type: employeeTypes[employeeData.type]
  }

  return (
    <View employeeData={employeeData} options={options}/>
  )
}

export default EmployeeCard;