import { useCallback, useRef, useState } from "react";

interface UseDataChangerReturnType<T extends Record<string, any>> {
  data: Partial<T>;
  update: (value: Partial<T>) => void;
  reset: () => void;
  dataRef: React.MutableRefObject<T>;
}

export const useDataChanger = <T extends Record<string, any>>(
  init?: T
): UseDataChangerReturnType<T> => {
  const [data, setData] = useState({ ...init } as T);
  const dataRef = useRef({ ...init } as T);

  const update = useCallback(
    (value: Partial<T>): void => {
      const temp = {
        ...dataRef.current,
        ...value
      };

      dataRef.current = temp;
      setData(temp);
    },
    [setData]
  );

  const reset = useCallback((): void => {
    setData({ ...init } as T);
  }, [init]);

  return {
    data,
    dataRef,
    reset,
    update
  };
};
