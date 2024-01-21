import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

export function useCopyClipboard<T extends HTMLElement>(
  text: string,
  timeout = 1000
) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const ref = useRef() as MutableRefObject<T>;

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    // Do additional thing after copied
    // I add right away in here to reduce boiler code in my components
    toast.success("Referral Link Copied!", {
      className: "toast-success",
    });
  }, [text]);

  useEffect(() => {
    if (isCopied) {
      const hide = setTimeout(() => {
        setIsCopied(false);
      }, timeout);

      return () => {
        clearTimeout(hide);
      };
    }
  }, [isCopied, setIsCopied, timeout]);

  useEffect(() => {
    const refEl = ref.current;

    if (refEl) {
      refEl.addEventListener("click", copy);
      return () => refEl.removeEventListener("click", copy);
    }
  }, [copy]);

  return { ref, isCopied };
}
