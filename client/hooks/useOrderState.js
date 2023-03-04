import React from "react";
import { generateId } from "~/helpers/generateId";

export const useOrderState = ()=> {
  const initialState = {
    orders: [],
    orderErrors: [],
    gettedOrder: null,
    isCreatingOrder: false,
    isUpdatingOrder: false,
    isDeletingOrder: false,
    isGettingOrder: false,
    isGettingOrders: false
  }

  const [state, setState] = React.useState(initialState);

  const resetStateOrders = ()=> {
    setState(initialState);
  }

  const setIsCreatingOrder = (value)=> {
    setState((state)=> ({...state, isCreatingOrder: value}));
  }

  const setIsUpdatingOrder = (value)=> {
    setState((state)=> ({...state, isUpdatingOrder: value}));
  }

  const setIsDeletingOrder = (value)=> {
    setState((state)=> ({...state, isDeletingOrder: value}));
  }

  const setIsGettingOrder = (value)=> {
    setState((state)=> ({...state, isGettingOrder: value}));
  }

  const setIsGettingOrders = (value)=> {
    setState((state)=> ({...state, isGettingOrders: value}));    
  }

  const createListError = (error)=> {
    setState((state)=> {
      const errorId = generateId();
      
      const listError = {id: errorId, message: error ? error.message : ""};

      const orderErrors = [...state.orderErrors, listError];

      return {...state, orderErrors};
    })
  }

  const deleteListError = (error)=> {
    setState((state)=> {
      const orderErrors = state.orderErrors.filter((listError)=> (
        !(listError.id === error.id)
      ));

      return {...state, orderErrors};
    })
  }

  const createListOrder = (order)=> {
    setState((state)=> {
      const orders = [state.orders, order];

      return {...state, orders};
    });
  }

  const deleteListOrder = (order)=> {
    setState((state)=> {
      const orders = state.orders.filter((listOrder)=> (
        !(listOrder.id === order.id)
      ));

      return {...state, orders};
    });
  }

  const updateListOrder = (order)=> {
    setState((state)=> {
      const orders = state.orders.map((listOrder)=> (
        listOrder.id === order.id ? ({...listOrder, ...order}) : listOrder
      ));

      return {...state, orders};
    });
  }

  const setGettedOrder = (order)=> {
    setState((state)=> {
      return {...state, gettedOrder: order};
    });
  }

  const setOrders = (orders)=> {
    setState((state)=> ({...state, orders}));
  }

  return {
    state,
    resetStateOrders,
    setIsCreatingOrder,
    setIsUpdatingOrder,
    setIsDeletingOrder,
    setIsGettingOrder,
    setIsGettingOrders,
    createListError,
    deleteListError,
    createListOrder,
    deleteListOrder,
    updateListOrder,
    setGettedOrder,
    setOrders
  }
}
