import { ReactNode, useEffect, useRef, useState } from "react";
import { isEqual, range } from "lodash-es";

import styles from "./Keypad.module.css";

type KeyProps = {
  value: KeypadKey;
  onClick: (value: KeypadKey) => void;
  className?: string | undefined;
  children?: ReactNode | undefined;
};

function Key({ value, onClick, className = "", children }: KeyProps) {
  return (
    <button
      type="button"
      value={value}
      className={`${styles.key} ${className}`}
      onClick={() => onClick(value)}
    >
      {children === undefined ? value : children}
    </button>
  );
}

type CloseKeyProps = {
  onClick: () => void;
};

function CloseKey({ onClick }: CloseKeyProps) {
  return (
    <button
      type="button"
      className={`${styles.key} ${styles.closeKey}`}
      onClick={() => onClick()}
    >
      ╳
    </button>
  );
}

type KeypadDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type KeypadKey = KeypadDigit | "backspace";

type KeysProps = {
  onClick: (value: KeypadKey) => void;
  onClose: () => void;
};

function Keys({ onClick, onClose }: KeysProps) {
  return (
    <div className={styles.keys}>
      <div className={styles.row}>
        <Key value="1" onClick={onClick} />
        <Key value="2" onClick={onClick} />
        <Key value="3" onClick={onClick} />
      </div>
      <div className={styles.row}>
        <Key value="4" onClick={onClick} />
        <Key value="5" onClick={onClick} />
        <Key value="6" onClick={onClick} />
      </div>
      <div className={styles.row}>
        <Key value="7" onClick={onClick} />
        <Key value="8" onClick={onClick} />
        <Key value="9" onClick={onClick} />
      </div>
      <div className={styles.row}>
        <CloseKey onClick={onClose} />
        <Key value="0" onClick={onClick} />
        <Key
          value="backspace"
          onClick={onClick}
          className={styles.backspaceKey}
        >
          <div className={styles.backspaceKeyWrapper}>⌫</div>
        </Key>
      </div>
    </div>
  );
}

type MaskProps = {
  value: string;
  length: number;
};

function Mask({ value, length }: MaskProps) {
  const prevRef = useRef(value);
  const [revealLast, setRevealLast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      prevRef.current = value;
    };
  }, [value]);

  useEffect(() => {
    const didAdd = value.length > prevRef.current.length;

    if (didAdd) {
      setRevealLast(true);

      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          setRevealLast(false);
        }
      }, 1000);
    }
  }, [value]);

  return (
    <div className={styles.mask}>
      {range(0, length).map((i) => {
        const shown = revealLast && i === value.length - 1;
        const hidden = !shown && i <= value.length - 1;

        return (
          <div
            key={i}
            className={`${styles.char} ${shown ? styles.shownChar : ""} ${
              hidden ? styles.hiddenChar : ""
            }`}
          >
            {shown ? value.charAt(i) : hidden ? "*" : ""}
          </div>
        );
      })}
    </div>
  );
}

export type KeypadProps = {
  length: number;
  onSubmit: (value: string) => void;
  onClose: () => void;
  initialValue?: string | undefined;
};

export function Keypad({
  initialValue = "",
  length,
  onSubmit,
  onClose,
}: KeypadProps) {
  const [value, setValue] = useState(initialValue);
  const prevRef = useRef(value);

  useEffect(() => {
    return () => {
      prevRef.current = value;
    };
  }, [value]);

  useEffect(() => {
    if (value !== prevRef.current && value.length >= length) {
      setValue("");
      onSubmit(value.substring(0, length));
    }
  }, [value, length, onSubmit]);

  return (
    <div className={styles.root}>
      <Mask value={value} length={length} />
      <Keys
        onClick={(key) => {
          if (key === "backspace") {
            setValue((value) => value.substring(0, value.length - 1));
          } else {
            setValue((value) => value + key);
          }
        }}
        onClose={onClose}
      />
    </div>
  );
}
