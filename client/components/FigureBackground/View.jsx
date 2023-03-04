import React from "react";
import Image from 'next/image';
import style from './styles.module.scss';

function View({coordinates, src}) {
  return (
    <figure className={style.figureBackground} style={coordinates}>
      <Image
        src={src}
        alt="Figure Image Background"
        className={style.figureBackground}
      />
    </figure>
  );
}

export default View;
