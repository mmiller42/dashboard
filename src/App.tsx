import { Keypad } from "./Keypad";
import { ErrorModal, LoadingModal, Modal } from "./Modal";
import { emitError, useWatchError } from "./ErrorContext";
import { Mode, ModeSelect, State } from "./ModeSelect";
import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { fetchInfo, updateMode } from "./api";

function RootErrorModal() {
  const error = useWatchError();

  const [open, setOpen] = useState(Boolean(error));
  const handleClose = () => {
    error?.clear();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(Boolean(error));
  }, [error]);

  return createPortal(
    <ErrorModal open={open} onClose={handleClose} error={error?.error} />,
    document.getElementById("modal-root")!,
  );
}

export default function App() {
  const [view, setView] = useState<"mode" | "keypad">("mode");
  const [mode, setMode] = useState<Mode>("off");
  const [state, setState] = useState<State>("normal");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    function loop() {
      if (!isMounted) return;

      fetchInfo()
        .then(({ mode, state }) => {
          if (isMounted) {
            setMode(mode);
            setState(state);

            setTimeout(loop, 1000);
          }
        })
        .catch((error: unknown) => {
          emitError(error);
        });
    }

    setTimeout(loop, 1000);

    return () => {
      isMounted = false;
    };
  }, []);

  console.log("mode:", mode);
  return (
    <>
      <ModeSelect
        mode={mode}
        onClick={(next) => {
          if (mode === next) return;

          if (next === "off") {
            setView("keypad");
          } else if (next === "on") {
            setLoading(true);

            updateMode({ mode: "on" })
              .then(() => {
                console.log("updated");
                setMode("on");
              })
              .catch((error: unknown) => {
                emitError(error);
              })
              .finally(() => {
                setLoading(false);
              });
          }
        }}
        state={state}
      />
      <Modal
        key={view} // reset state when closing
        className="autoWidth"
        open={view === "keypad"}
        onClose={() => setView("mode")}
        autoWidth
      >
        <Keypad
          onSubmit={(pin) => {
            setView("mode");
            setLoading(true);

            updateMode({ mode: "off", pin })
              .then(() => {
                console.log("updated");
                setMode("off");
              })
              .catch((error: unknown) => {
                emitError(error);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
          onClose={() => setView("mode")}
          length={4}
        />
      </Modal>
      <LoadingModal loading={loading} />
      <RootErrorModal />
    </>
  );
}
