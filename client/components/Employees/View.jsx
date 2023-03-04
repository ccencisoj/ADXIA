import React from "react";
import EmployeeCard from "~/components/EmployeeCard/EmployeeCard";
import { NothingMessage } from "~/components/NothingMessage/NothingMessage";
import { useEmployee } from "~/contexts/employeeContext";
import styles from "./styles.module.scss";

function View({ employees }) {  

  const { employee: currentEmployee } = useEmployee();

  employees = employees ? employees.filter((employee)=> (
    !(employee.id === currentEmployee.id)
  )) : null;
  
  return (Array.isArray(employees) && employees.length) ?
    <div className={styles.employees}>
      {employees.map((employee)=> (
        <EmployeeCard key={employee.id} employeeData={employee} options/>
      ))}
    </div> :
    <NothingMessage message="No hay empleados"/>
}

export default View;
