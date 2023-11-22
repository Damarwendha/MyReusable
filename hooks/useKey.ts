import { useEffect } from "react";

export function useKey(keyName: string | string[], callback: () => void) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (
        typeof keyName === "object" &&
        keyName.map((v) => v.toLowerCase()).includes(event.key.toLowerCase())
      ) {
        callback();
      } else if (
        typeof keyName === "string" &&
        !keyName.startsWith("mod_") &&
        event.key.toLowerCase() === keyName.toLowerCase()
      ) {
        callback();
      } else if (
        typeof keyName === "string" &&
        keyName.startsWith("mod_") &&
        event.metaKey &&
        event.key.toLowerCase() === keyName.replace("mod_", "").toLowerCase()
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [callback, keyName]);
}
