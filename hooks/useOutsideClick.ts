import { useEffect, useRef } from "react";

function useOutsideClick(
  callback: () => void,
  listenCapturing: boolean = true,
) {
  const refInside = useRef(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refInside.current && !refInside.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [callback, listenCapturing]);

  return refInside;
}

export { useOutsideClick };
