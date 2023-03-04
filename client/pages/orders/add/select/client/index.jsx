import React from 'react';
import PrincipalLayout from '~/layout/PrincipalLayout';
import style from './styles.module.scss';
import { SelectableClients } from '~/components/SeletableClients/SelectableClients';
import { useIsFetching } from 'react-query';
import { ClientsSkeleton } from '~/components/ClientsSkeleton/ClientsSkeleton';
import { useOrder } from '~/contexts/orderContext';
import { useRouter } from 'next/router';
import { EmployeeProvider } from '~/contexts/employeeContext';
import { requiredEmployee } from '~/helpers/requiredEmployee';
import { EMPLOYEE_TYPE_ADMIN, EMPLOYEE_TYPE_VENDOR } from '~/constants/employeeTypes';

function Index({employee}) {
  const { setSelectedClient } = useOrder();
  const router = useRouter();
  const isFetchingClients = useIsFetching(["ordersClients"]);

  return (
    <EmployeeProvider employee={employee}>
      <PrincipalLayout title={'Selecciona un cliente'}>
        <div className={style.clientList}>
          {isFetchingClients ? 
            <ClientsSkeleton/> : 
            <SelectableClients 
              inEdit={false}
              onSelectClient={(client)=> {
                setSelectedClient(client);
                router.back();
              }}/>}
        </div>
      </PrincipalLayout>
    </EmployeeProvider>
  )
}

export default Index;

export const getServerSideProps = requiredEmployee((employee)=> {

  if(employee.type === EMPLOYEE_TYPE_ADMIN ||
    employee.type === EMPLOYEE_TYPE_VENDOR) {
    return {props: {employee}};
  }

  return {props: {}, redirect: {destination: "/home"}};
});
