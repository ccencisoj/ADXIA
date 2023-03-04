import React from "react";
import Link from "next/link";
import DefaultLayout from "@/layout/DefaultLayout";
import NavBar from "@/components/NavBar/NavBar";
import styles from "./home.module.scss";
import OptionsNavBar from "~/components/OptionsNavBar/OptionsNavBar";
import { requiredEmployee } from "~/helpers/requiredEmployee";
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_DELIVERER, EMPLOYEE_TYPE_VENDOR } from "~/constants/employeeTypes";
import OrdersSkeleton from "~/components/OrdersSkeleton/OrdersSkeleton";
import { useIsFetching, useMutation } from "react-query";
import { Orders } from "~/components/Orders/Orders";
import { useOrder } from "~/contexts/orderContext";
import { EmployeeProvider, useEmployee } from "~/contexts/employeeContext";
import { DialogModal } from "~/components/DialogModal/DialogModal";
import { HomeNavBar } from "~/components/HomeNavBar/HomeNavBar";
import { downloadFile } from "~/helpers/downloadFile";
import { agent } from "~/agent";
import { useRouter } from "next/router";
import Loading from "~/components/Loading/Loading";

function Index({ employee }) {
  const { resetState } = useOrder();

  const router = useRouter();
  
  const isFetchingOrders = useIsFetching(["orders"]);

  const logoutEmployeeMutation = useMutation({
    mutationKey: "logoutEmployee",
    mutationFn: agent.Employee.logout,
    onSuccess: ()=> {
      router.push("/login");
    }
  });

  React.useEffect(()=> { 
    resetState();
  }, []);

  return (
    <EmployeeProvider employee={employee}>
      <Loading 
        label="Cerrando sesion" 
        visible={logoutEmployeeMutation.isLoading}/>
      <DefaultLayout className={styles.layout}>
        {/* Header color blue where contain differents information of the user */}
        <header className={styles.headerContainer}>
          <div className={styles.informationContainer}>
            <div className={styles.actions}>
              <img src={employee.imageURL} alt="Perfil Image" className={styles.image}/>
              <div className={styles.right}>
                <button className={styles.icon_button} onClick={()=> {
                  logoutEmployeeMutation.mutate();
                }}>
                  <img src="/image/exit1.svg" alt="Icon button"/>
                </button>
                <button className={styles.icon_button} onClick={()=> downloadFile("/manual/Manual de usuario.pdf")}>
                  <img src="/image/file1.svg" alt="Icon button"/>
                </button>
                <button className={styles.icon_button}>
                  <img src="/image/help1.svg" alt="Icon button"/>
                </button>
              </div>
            </div>
            <div className={styles.nameConatainer}>
                <h1>Bienvenido</h1>
                <h5>{employee.name} {employee.surname}</h5>
            </div>
          </div>
        </header>
        {/* Options for access to orders and clients */}
        <section className={styles.mainMenu}>
          <h1>Menu principal</h1>
          {(employee.type === EMPLOYEE_TYPE_ADMIN ||
            employee.type === EMPLOYEE_TYPE_VENDOR ||
            employee.type === EMPLOYEE_TYPE_DELIVERER) ? 
            <Link href={'/orders'}>
              <div style={{borderBottom:'1px solid #F1F1FF'}}>
                <h1>Pedidos</h1>
                <span>Visualiza todos los pedidos que has realizado</span>
              </div>
            </Link> : null}
          {(employee.type === EMPLOYEE_TYPE_ADMIN ||
            employee.type === EMPLOYEE_TYPE_VENDOR) ?
            <Link href={'/clients'}>
              <div style={{borderBottom:'1px solid #F1F1FF'}}>
                <h1>Clientes</h1>
                <span>Visualiza, agregar, elimina y actualiza clientes</span>
              </div>
            </Link> : null}
          {employee.type === EMPLOYEE_TYPE_ADMIN &&
          <Link href={'/employees'}>
            <div style={{borderBottom:'1px solid #F1F1FF'}}>
              <h1>Empleados</h1>
              <span>Visualiza, agregar, elimina y actualiza empleados</span>
            </div>
          </Link>}
          {employee.type === EMPLOYEE_TYPE_ADMIN &&
          <Link href={'/products'}>
            <div>
              <h1>Productos</h1>
              <span>Visualiza, agregar, elimina y actualiza productos</span>
            </div>
          </Link>}
        </section>
        <section className={styles.recientOrders}>
          <h1 className={styles.title}>Pedidos recientes</h1>
          {isFetchingOrders ? <OrdersSkeleton/> : <Orders/>}
        </section>
        <DialogModal message="Hola mundo"/>
        <HomeNavBar>
          <OptionsNavBar linkAdd={'/orders/add'}/>
        </HomeNavBar>
      </DefaultLayout>
    </EmployeeProvider>
  );
}

export default Index;

export const getServerSideProps = requiredEmployee((employee)=> {
  
  if(employee.type === EMPLOYEE_TYPE_ADMIN ||
    employee.type === EMPLOYEE_TYPE_VENDOR ||
    employee.type === EMPLOYEE_TYPE_DELIVERER) {
    return {props: {employee}};
  } 

  return {props: {}, redirect: {destination: "/login"}};
})
