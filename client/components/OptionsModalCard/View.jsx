import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

function View({ href, icon, message, onClick }) {
  return href ? (
    <Link href={href}>
      <div className={styles.optionContainer} onClick={onClick}>
        {icon}
        <span>{message}</span>
      </div>
    </Link>
  ) : (
    <div className={styles.optionContainer} onClick={onClick}>
      {icon}
      <span>{message}</span>
    </div>
  );
}

export default View;
