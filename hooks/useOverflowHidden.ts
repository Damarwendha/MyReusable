/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

function useOverflowHidden(
  setIsHidden: boolean = true,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const bodyElement = document.querySelector("body") as HTMLElement;

    // Q: Why didn't you simply use 'overflow: hidden' instead?
    // A: The reason for this is that overflow: hidden makes the site jump and take up the area where the scroll was.
    if (setIsHidden) {
      bodyElement.style.position = "fixed";
      bodyElement.style.overflowY = "scroll";
      bodyElement.style.width = "100%";
    } else {
      bodyElement.style.position = "unset";
      bodyElement.style.overflowY = "unset";
      bodyElement.style.width = "unset";
    }

    return () => {
      bodyElement.style.position = "unset";
      bodyElement.style.overflowY = "unset";
      bodyElement.style.width = "unset";
    };
  }, deps);
}

export { useOverflowHidden };
