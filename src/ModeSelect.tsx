import { memo, ReactElement } from "react";
import * as styles from "./ModeSelect.module.css";
import { OffIcon } from "./OffIcon";
import { OnIcon } from "./OnIcon";
import { AlarmIcon } from "./AlarmIcon";
import { Spinner } from "./Spinner";

export type Mode = "on" | "off";
export type State = "normal" | "alarmed" | "pending";

type ModeButtonProps = {
  active: boolean;
  mode: Mode;
  onClick: (mode: Mode) => void;
  activeText: string;
  inactiveText: string;
  className: string;
  icon: ReactElement;
};

const ModeButton = memo(function ModeButton({
  active,
  mode,
  onClick,
  activeText,
  inactiveText,
  className,
  icon,
}: ModeButtonProps) {
  return (
    <button
      value={mode}
      className={`${styles.button} ${
        active ? styles.activeButton : ""
      } ${className}`}
      onClick={() => onClick(mode)}
    >
      <div className={styles.icon}>{icon}</div>
      <span className={styles.label}>{active ? activeText : inactiveText}</span>
    </button>
  );
});

type ModeSelectProps = {
  mode: Mode;
  state: State;
  onClick: (mode: Mode) => void;
};

export const ModeSelect = memo(function ModeSelect({
  mode,
  state,
  onClick,
}: ModeSelectProps) {
  return (
    <div className={styles.root}>
      <ModeButton
        mode="off"
        active={mode === "off"}
        onClick={onClick}
        activeText="Disarmed"
        inactiveText="Disarm"
        className={styles.offButton}
        icon={<OffIcon />}
      />
      <ModeButton
        mode="on"
        active={mode === "on"}
        onClick={onClick}
        activeText="Armed"
        inactiveText="Arm"
        className={`${styles.onButton} ${
          state === "alarmed"
            ? styles.alarmed
            : state === "pending"
            ? styles.pending
            : ""
        }`}
        icon={
          state === "alarmed" ? (
            <AlarmIcon />
          ) : state === "pending" ? (
            <div className={styles.spinnerContainer}>
              <Spinner blowUp={false} className={styles.pendingSpinner} />
            </div>
          ) : (
            <OnIcon />
          )
        }
      />
    </div>
  );
});
