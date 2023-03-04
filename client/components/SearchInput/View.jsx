import React from 'react';
import {Field, ErrorMessage, Form} from 'formik';
import { Search } from 'react-feather';
import style from './styles.module.scss';

function View({placeholder, onSearchValue}) {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <Form 
      onChange={(ev)=> {
        const searchValue = ev.target.value;
        setSearchValue(searchValue);
      }} 
      className={style.formSearch}>
        <Search width={25} height={25} className={style.iconSearch}/>
        <Field 
          type='text' 
          autoComplete="off"
          name={'paramSearch'} 
          onKeyUp={(ev)=> {
            if(ev.key === "Enter") onSearchValue(searchValue);
          }}
          placeholder={placeholder}
          className={style.input}/>
        <button type="button" className={style.button} onClick={()=> {
          onSearchValue(searchValue);
        }}>
          Buscar
        </button>
    </Form>
  )
}

export default View