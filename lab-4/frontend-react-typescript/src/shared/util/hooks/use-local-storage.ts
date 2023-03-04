import { useState, useEffect } from "react";

const getStorageValue = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

// export const useLocalStorage = <T = any>( //or import 'usehooks-ts'
//   key: string,
//   defaultValue: T
// ): [T, (value: T) => void] => {
//   const [value, setValue] = useState(() => {
//     return getStorageValue(key, defaultValue);
//   });

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };

// / Complicated realization
// https://github.com/ani-team/github-client/blob/dev/src/shared/hooks/use-local-storage.ts

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      return getStorageValue(key, initialValue);
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((data: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
