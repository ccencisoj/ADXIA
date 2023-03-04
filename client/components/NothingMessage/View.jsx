import React from 'react';
import style from './styles.module.scss';

function View({message}) {
  return (
    <div className={style.message}>
      {message}
    </div>
  )
}

export default View;