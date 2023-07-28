import { ReactNode } from "react";
import { Spinner } from "./Spinner";
import styles from "./Modal.module.css";

type ModalProps = {
  children?: ReactNode | undefined;
  open: boolean;
  onClose: () => void;
  className?: string | undefined;
};

export function BaseModal({
  children = null,
  open,
  onClose,
  className = "",
}: ModalProps) {
  return (
    <div
      className={`${styles.root} ${className}`}
      style={open ? undefined : { display: "none" }}
      onClick={() => onClose()}
    >
      <div className={styles.wrapper}>
        <div
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

type SpinnerModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SpinnerModal({ open, onClose }: SpinnerModalProps) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <Spinner />
    </BaseModal>
  );
}

export function Modal({
  children,
  open,
  onClose,
  className,
  autoWidth = false,
}: ModalProps & { autoWidth?: boolean }) {
  return (
    <BaseModal open={open} onClose={onClose} className={className}>
      <div
        className={`${styles.content} ${open ? styles.contentOpen : null}`}
        style={!autoWidth ? undefined : { width: "auto" }}
      >
        {children}
      </div>
    </BaseModal>
  );
}

type ErrorModalProps = {
  error: unknown;
  open: boolean;
  onClose: () => void;
};

export function ErrorModal({ error, open, onClose }: ErrorModalProps) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <div className={`${styles.content} ${open ? styles.contentOpen : null}`}>
        {String(error)}
      </div>
    </BaseModal>
  );
}

type LoadingModalProps = {
  loading: boolean;
};

export function LoadingModal({ loading }: LoadingModalProps) {
  return (
    <BaseModal open={loading} onClose={() => {}}>
      <Spinner />
    </BaseModal>
  );
}
