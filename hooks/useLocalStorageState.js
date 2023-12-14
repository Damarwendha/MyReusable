import { useState, useEffect } from "react";

export function useLocalStorageState(key, initialValue) {
  const [isClient, setIsClient] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isClient) {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    }
  }, [isClient, key]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key, isClient]);

  return [value, setValue];
}
