import { useState, useEffect } from "react";

export function useLocalStorageState(key: string, initialValue: any) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)!) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  
  return [value, setValue];
}
