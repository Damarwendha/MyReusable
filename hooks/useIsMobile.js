import { useCallback, useEffect, useState } from "react";

const breakpoint = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const getIsMobile = useCallback(() => {
    return isClient ? window.innerWidth < breakpoint : false;
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
    if (isClient) setIsMobile(getIsMobile());
  }, [isClient, getIsMobile]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(getIsMobile());
    }

    if (isClient) {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    return undefined;
  }, [isClient, getIsMobile]);

  return isMobile;
}
