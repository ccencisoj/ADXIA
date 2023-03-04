import React from "react";

const SearchContext = React.createContext({
  searchValue: "",
  deliveryState: "",
  resetSearch: ()=> 1,
  setSearchValue: ()=> 1,
  setDeliveryState: ()=> 1,
  getSearchValue: async ()=> 1
});

export const SearchProvider = ({children})=> {
  const initialState = {
    searchValue: "",
    deliveryState: "DELIVERED"
  }

  const [state, setState] = React.useState(initialState);

  const resetSearch = ()=> {
    setState(initialState);
  }

  const setSearchValue = (searchValue)=> {
    setState((prevState)=> ({...prevState, searchValue}))
  }

  const setDeliveryState = (deliveryState)=> {
    setState((prevState)=> ({...prevState, deliveryState}))
  }

  const getSearchValue = ()=> {
    return new Promise((resolve)=> {
      setState((state)=> {

        resolve(state.searchValue);

        return state;
      })
    })
  }

  const getDeliveryState = ()=> {
    return new Promise((resolve)=> {
      setState((state)=> {

        resolve(state.deliveryState);

        return state;
      })
    })
  }
  
  
  return (
    <SearchContext.Provider value={{
      ...state,
      resetSearch,
      setSearchValue,
      getSearchValue,
      setDeliveryState,
      getDeliveryState
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = ()=> {
  return React.useContext(SearchContext);
}
