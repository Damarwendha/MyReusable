import { useToast } from "@/components/ui/use-toast";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export function useCopyClipboard<T extends HTMLElement>(
  text: string,
  timeout = 0
) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const ref = useRef() as MutableRefObject<T>;
  const { toast } = useToast();

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    // Do additional thing after copied
    toast({
      description: "Link has been successfully copied to your clipboard",
      title: "Link Copied!! 📝",
      className: "shadow-lg shadow-background",
      duration: 3000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
