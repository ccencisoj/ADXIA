import React from 'react';
import {useRouter} from "next/router";
import View from './View';

function OptionsNavBar({linkAdd}) {
  const {pathname} = useRouter();
  
  return (
    <View linkAdd={linkAdd} path={pathname}/>
  )
}

export default OptionsNavBar