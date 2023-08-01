import { memo, ReactNode } from "react";
import { Spinner } from "./Spinner";
import styles from "./Modal.module.css";
import { AxiosError } from "axios";

type ModalProps = {
  children?: ReactNode | undefined;
  open: boolean;
  onClose: () => void;
  className?: string | undefined;
};

export const BaseModal = memo(function BaseModal({
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
});

type SpinnerModalProps = {
  open: boolean;
  onClose: () => void;
};

export const SpinnerModal = memo(function SpinnerModal({
  open,
  onClose,
}: SpinnerModalProps) {
  return (
    <BaseModal open={open} onClose={onClose}>
      <Spinner />
    </BaseModal>
  );
});

export const Modal = memo(function Modal({
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
});

type ErrorModalProps = {
  error: unknown;
  open: boolean;
  onClose: () => void;
};

export const ErrorModal = memo(function ErrorModal({
  error,
  open,
  onClose,
}: ErrorModalProps) {
  const message =
    (error as AxiosError<{ error: string }>)?.response?.data?.error ??
    (error as Error)?.message ??
    String(error);
  return (
    <BaseModal open={open} onClose={onClose}>
      <div className={`${styles.content} ${open ? styles.contentOpen : null}`}>
        {message}
      </div>
    </BaseModal>
  );
});

type LoadingModalProps = {
  loading: boolean;
};

export const LoadingModal = memo(function LoadingModal({
  loading,
}: LoadingModalProps) {
  return (
    <BaseModal open={loading} onClose={() => {}}>
      <Spinner />
    </BaseModal>
  );
});
