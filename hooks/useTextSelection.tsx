import { MutableRefObject, useEffect, useRef } from "react";

// Ex. of use case
// const pRef = useTextSelection() as RefObject<HTMLParagraphElement>;

// Better rename it to useRangeSelection but im too lazy to doing that 😅
export function useTextSelection<T extends HTMLElement>() {
  const ref = useRef() as MutableRefObject<T>;

  function handleClick() {
    if (ref.current) {
      const range = document.createRange();
      range.selectNodeContents(ref.current);

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  useEffect(() => {
    const refEl = ref?.current;

    if (refEl) {
      refEl.addEventListener("click", handleClick);
      return () => refEl.removeEventListener("click", handleClick);
    }
  }, []);

  return ref;
}
