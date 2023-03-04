import React from 'react';
import style from './styles.module.scss';
import { Portal } from '~/components/Portal/Portal';

function View({children}) {
  return (
    <Portal>
      <div className={style.navBar}>
          {children}
      </div>
    </Portal>
  )
}

export default View