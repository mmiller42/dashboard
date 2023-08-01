import { memo } from "react";
import styles from "./Spinner.module.css";

type SpinnerProps = {
  blowUp?: boolean | undefined;
  className?: string | undefined;
};

export const Spinner = memo(function Spinner({
  blowUp = true,
  className = "",
}: SpinnerProps) {
  return (
    <div
      className={`${styles.root} ${blowUp ? styles.blowUp : ""} ${className}`}
    >
      <div className={styles.chunk} />
      <div className={styles.chunk} />
      <div className={styles.chunk} />
      <div className={styles.chunk} />
      <div className={styles.chunk} />
      <div className={styles.chunk} />
      <div className={styles.chunk} />
      <div className={styles.chunk} />
    </div>
  );
});
