import styles from "./Spinner.module.css";

const spinner = (
  <div className={styles.root}>
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

export function Spinner() {
  return spinner;
}
