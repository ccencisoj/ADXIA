import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { Portal } from '~/components/Portal/Portal';

function View({visible, onClickBackground, children}) {
  
  const stylesBackgroundModal = clsx({
    [styles.backgroundModal]: true,
    [styles.visible]: visible,
    [styles.hidden]: !visible
  });
  
  return (
    <Portal>
      <div className={stylesBackgroundModal} onClick={onClickBackground}>
          <div className={styles.preContainer}>
              <div className={styles.modalOptionsContainer}>
                  {children}
              </div>
          </div>
      </div>
    </Portal>
  )
}

export default View