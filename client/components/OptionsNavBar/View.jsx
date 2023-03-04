import React from "react";
import Link from "next/link";
import { Home, BarChart2, Plus } from "react-feather";
import styles from './styles.module.scss';
import { useEmployee } from "~/contexts/employeeContext";
import { EMPLOYEE_TYPE_DELIVERER } from "~/constants/employeeTypes";

function View({linkAdd, path}) {
  const { employee } = useEmployee();

  return (
    <div className={styles.navBar}>
      <Link href={"/home"}>
        <div className={(path==='/home'?'active ':'') + styles.iconContainer}>
          <Home />
        </div>
      </Link>
      {!(employee?.type === EMPLOYEE_TYPE_DELIVERER) ? 
        <Link href={linkAdd}>
          <div className={styles.add}>
            <Plus color="white" />
          </div>
        </Link>
        : 
        null
      }
      <Link href={"/updateing"}>
        <div className={(path==='/updateing'?'active ':'') + styles.iconContainer}>
          <BarChart2 color="#D6E0F6" />
        </div>
      </Link>
    </div>
  );
}

export default View;
