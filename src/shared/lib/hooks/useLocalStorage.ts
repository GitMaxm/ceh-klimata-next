import { useEffect, useState } from 'react';

type TSetValue<T> = React.Dispatch<React.SetStateAction<T>>;

export const useLocalStorage = <T, >(
  key: string,
  defaultValue: T | (() => T),
): [T, TSetValue<T>] => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
    }

    try {
      const saved = localStorage.getItem(key);

      if (saved !== null) {
        return JSON.parse(saved) as T;
      }

      return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
    } catch (error) {
      console.error('Ошибка чтения localStorage:', error);
      return typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Ошибка записи localStorage:', error);
      }
    }
  }, [key, value]);

  return [value, setValue];
};
