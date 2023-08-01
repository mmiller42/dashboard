import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ErrorListener = (error: unknown) => void;
type UnsubscribeFn = () => void;

type ErrorContext = {
  emit: (error: unknown) => void;
  subscribe: (listener: ErrorListener) => UnsubscribeFn;
};

function createErrorContext(): ErrorContext {
  const listeners = new Set<(error: unknown) => void>();
  let lastError: { error: unknown } | null = null;

  return {
    emit: (error) => {
      lastError = { error };
      listeners.forEach((listener) => listener(error));
    },
    subscribe: (listener) => {
      let added = true;
      listeners.add(listener);

      if (lastError && listeners.size === 1) {
        const { error } = lastError;
        setTimeout(() => {
          if (added) {
            listener(error);
          }
        });
      }

      return () => {
        added = false;
        listeners.delete(listener);
      };
    },
  };
}

const defaultContext = createErrorContext();
const context = createContext<ErrorContext>(defaultContext);

export function subscribeError(listener: ErrorListener): UnsubscribeFn {
  return defaultContext.subscribe(listener);
}

subscribeError((error) => {
  console.error(error);
});

export function useSubscribeError(): (
  listener: ErrorListener,
) => UnsubscribeFn {
  const { subscribe } = useContext(context);
  return subscribe;
}

export function emitError(error: unknown) {
  defaultContext.emit(error);
}

export function useEmitError(): (error: unknown) => void {
  const { emit } = useContext(context);
  return emit;
}

export type UseErrorResult = { error: unknown; clear: () => void } | null;

export function useWatchError(): UseErrorResult {
  const subscribe = useSubscribeError();
  const [result, setResult] = useState<{ error: unknown } | null>(null);

  useEffect(() => {
    return subscribe((error) => setResult({ error }));
  }, [subscribe]);

  const clear = useCallback(() => setResult(null), []);

  return result ? { ...result, clear } : null;
}
