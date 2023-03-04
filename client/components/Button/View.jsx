import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

function View({primary, light, title, type, form, disabled, onClick}) {

  const styles_button = clsx({
    [styles.button]: true, 
    [styles.primary]: primary,
    [styles.light]: light
  });

  return (
    <button type={type} form={form} disabled={disabled} className={styles_button} onClick={onClick}>
        {title}
    </button>
  )
}

export default View;