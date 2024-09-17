import React from "react";
import styles from "./Error.module.scss";

type Props = {
  errorMassage: string;
};

export const Error: React.FC<Props> = ({ errorMassage }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.errors}>{errorMassage}</div>
    </div>
  );
};
