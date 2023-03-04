import React from "react";
import { generateId } from "~/helpers/generateId";

export const useProductState = ()=> {
  const initialState = {
    products: [],
    productErrors: [],
    gettedProduct: null,
    isCreatingProduct: false,
    isUpdatingProduct: false,
    isDeletingProduct: false,
    isGettingProduct: false,
    isGettingProducts: false
  }

  const [state, setState] = React.useState(initialState);

  const resetStateProducts = ()=> {
    setState(initialState);
  }

  const setIsCreatingProduct = (value)=> {
    setState((state)=> ({...state, isCreatingProduct: value}));
  }

  const setIsUpdatingProduct = (value)=> {
    setState((state)=> ({...state, isUpdatingProduct: value}));
  }

  const setIsDeletingProduct = (value)=> {
    setState((state)=> ({...state, isDeletingProduct: value}));
  }

  const setIsGettingProduct = (value)=> {
    setState((state)=> ({...state, isGettingProduct: value}));
  }  

  const setIsGettingProducts = (value)=> {
    setState((state)=> ({...state, isGettingProducts: value}));    
  }

  const createListError = (error)=> {
    setState((state)=> {
      const errorId = generateId();
      
      const listError = {id: errorId, message: error ? error.message : ""};

      const productErrors = [...state.productErrors, listError];

      return {...state, productErrors};
    })
  }

  const deleteListError = (error)=> {
    setState((state)=> {
      const productErrors = state.productErrors.filter((listError)=> (
        !(listError.id === error.id)
      ));

      return {...state, productErrors};
    })
  }

  const createListProduct = (product)=> {
    setState((state)=> {
      const products = [state.products, product];

      return {...state, products};
    });
  }

  const deleteListProduct = (product)=> {
    setState((state)=> {
      const products = state.products.filter((listProduct)=> (
        !(listProduct.id === product.id)
      ));

      return {...state, products};
    });
  }

  const updateListProduct = (product)=> {
    setState((state)=> {
      const products = state.products.map((listProduct)=> (
        listProduct.id === product.id ? ({...listProduct, ...product}) : listProduct
      ));

      return {...state, products};
    });
  }

  const setGettedProduct = (product)=> {
    setState((state)=> {
      return {...state, gettedProduct: product};
    });
  }

  const setProducts = (products)=> {
    setState((state)=> ({...state, products}));
  }

  return {
    state,
    resetStateProducts,
    setIsCreatingProduct,
    setIsUpdatingProduct,
    setIsDeletingProduct,
    setIsGettingProduct,
    setIsGettingProducts,
    createListError,
    deleteListError,
    createListProduct,
    deleteListProduct,
    updateListProduct,
    setGettedProduct,
    setProducts
  }
}
