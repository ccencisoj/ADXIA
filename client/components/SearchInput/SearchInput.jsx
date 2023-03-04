import React from 'react';
import { Formik } from 'formik';
import View from './View';

function SearchInput({placeholder, onSearchValue}) {  
  return (
    <Formik
      initialValues={{
        paramSearch: ''
      }}
      onSubmit={()=> 1}
    >
      {()=>{
        return(
          <View placeholder={placeholder} onSearchValue={onSearchValue}/>
        )
      }}
    </Formik>
  )
}

export default SearchInput