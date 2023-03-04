import React from "react";
import { generateId } from "~/helpers/generateId";

export const useOrderState = ()=> {
  const initialState = {
    clients: [],
    clientsErrors: [],
    gettedClient: null,
    isCreatingClient: false,
    isUpdatingClient: false,
    isDeletingClient: false,
    isGettingClient: false,
    isGettingClients: false
  }

  const [state, setState] = React.useState(initialState);

  const resetStateClients = ()=> {
    setState(initialState);
  }

  const setIsCreatingClient = (value)=> {
    setState((state)=> ({...state, isCreatingClient: value}));
  }

  const setIsUpdatingClient = (value)=> {
    setState((state)=> ({...state, isUpdatingClient: value}));
  }

  const setIsDeletingClient = (value)=> {
    setState((state)=> ({...state, isDeletingClient: value}));
  }

  const setIsGettingClient = (value)=> {
    setState((state)=> ({...state, isGettingClient: value}));
  }

  const setIsGettingClients = (value)=> {
    setState((state)=> ({...state, isGettingClients: value}));    
  }

  const createListError = (error)=> {
    setState((state)=> {
      const errorId = generateId();
      
      const listError = {id: errorId, message: error ? error.message : ""};

      const clientErrors = [...state.clientErrors, listError];

      return {...state, clientErrors};
    })
  }

  const deleteListError = (error)=> {
    setState((state)=> {
      const clientErrors = state.clientErrors.filter((listError)=> (
        !(listError.id === error.id)
      ));

      return {...state, clientErrors};
    })
  }

  const createListClient = (client)=> {
    setState((state)=> {
      const clients = [state.clients, client];

      return {...state, clients};
    });
  }

  const deleteListClient = (client)=> {
    setState((state)=> {
      const clients = state.clients.filter((listClient)=> (
        !(listClient.id === client.id)
      ));

      return {...state, clients};
    });
  }

  const updateListClient = (client)=> {
    setState((state)=> {
      const clients = state.clients.map((listClient)=> (
        listClient.id === client.id ? ({...listClient, ...client}) : listClient
      ));

      return {...state, clients};
    });
  }

  const setGettedClient = (client)=> {
    setState((state)=> {
      return {...state, gettedOrder: client};
    });
  }

  const setClients = (clients)=> {
    setState((state)=> ({...state, clients}));
  }

  return {
    state,
    resetStateClients,
    setIsCreatingClient,
    setIsUpdatingClient,
    setIsDeletingClient,
    setIsGettingClient,
    setIsGettingClients,
    createListError,
    deleteListError,
    createListClient,
    deleteListClient,
    updateListClient,
    setGettedClient,
    setClients
  }
}
