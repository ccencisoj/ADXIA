import React from 'react';
import PrincipalLayout from '~/layout/PrincipalLayout';
import style from './styles.module.scss';
import { SelectableClients } from '~/components/SeletableClients/SelectableClients';
import { useIsFetching } from 'react-query';
import { ClientsSkeleton } from '~/components/ClientsSkeleton/ClientsSkeleton';
import { useOrder } from '~/contexts/orderContext';
import { useRouter } from 'next/router';

function Index() {
  const { setSelectedClient } = useOrder();
  const router = useRouter();
  const isFetchingClients = useIsFetching(["ordersClients"]);

  return (
    <PrincipalLayout title={'Selecciona un cliente'}>
      <div className={style.clientList}>
        {isFetchingClients ? 
          <ClientsSkeleton/> : 
          <SelectableClients 
            inEdit={true}
            onSelectClient={(client)=> {
              setSelectedClient(client);
              router.back();
            }}/>}
      </div>
    </PrincipalLayout>
  )
}

export default Index