import React from "react";

const OrderContext = React.createContext({
  total: 0,
  order: null,
  client: null,
  selectedProduct: null,
  products: [],
  resetState: ()=> 1,
  setOrder: ()=> 1,
  setSelectedClient: ()=> 1,
  setSelectedProduct: ()=> 1,
  addProduct: ()=> 1,
  deleteProduct: ()=> 1,
  isAddedProduct: ()=> 1
});

export const OrderProvider = ({children})=> {
  const initialState = {
    total: 0,
    order: null,
    client: null,
    selectedProduct: null,
    products: [] 
  }

  const [state, setState] = React.useState(initialState);

  let total = 0;

  for(let product of state.products) {
    total += product.price * product.quantity;
  }

  const resetState = ()=> {
    setState(initialState);
  }

  const setOrder = (order)=> {
    setState((prevState)=> ({
      ...prevState, 
      order: order,
      client: order.client, 
      products: order.products,
      selectedClient: order.client
    }))
  }
  
  const setSelectedClient = (client)=> {
    setState((prevState)=> ({...prevState, client}));
  }

  const setSelectedProduct = (product)=> {
    setState((prevState)=> ({...prevState, selectedProduct: product}));
  }

  const addProduct = (product)=> {
    setState((prevState)=> {
      const products = [...prevState.products, product];

      return {...prevState, products};
    })
  }

  const updateProduct = (product)=> {
    setState((prevState)=> {
      const products = prevState.products.map((iProduct)=> (
        iProduct.id === product.id ? ({...iProduct, ...product}) : iProduct
      ))

      return {...prevState, products};
    })
  }

  const deleteProduct = (product)=> {
    setState((prevState)=> {
      const products = prevState.products.filter((iProduct)=> (
        !(iProduct.id === product.id) 
      ))

      return {...prevState, products};
    })
  }

  const getProductById = (productId)=> {
    return state.products.map((product)=> (
      product.id === productId
    ))
  }

  const isAddedProduct = (product)=> {
    return state.products.some((iProduct)=> iProduct.id === product.id);
  }

  return (
    <OrderContext.Provider value={{
      ...state,
      total,
      setSelectedClient,
      setSelectedProduct,
      setOrder,
      addProduct,
      deleteProduct,
      getProductById,
      updateProduct,
      isAddedProduct,
      resetState
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = ()=> {
  return React.useContext(OrderContext);
}
