import { useCallback, useEffect, useState } from "react";

interface IUseCopyClipboardProps {
  copy: (toCopy: string) => void;
  isCopied: boolean;
}

export function useCopyClipboard(timeout = 1000): IUseCopyClipboardProps {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
  }, []);

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

  return { copy, isCopied };
}
