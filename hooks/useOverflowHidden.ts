import { useEffect, useState } from "react";
import { useResizeListener } from "./useResizeListener";

// Q: Why didn't you simply use 'overflow: hidden' instead?
// A: The reason for this is that because overflow: hidden makes the site jump and take up the area where the scroll was.

function useOverflowHidden(
  setIsHidden: boolean = true,
  deps: React.DependencyList = []
) {
  const [scrollTopPosition, setScrollTopPosition] = useState(0);

  const bodyElement = document.querySelector("body") as HTMLElement;

  // This is to fix resize behaviour,
  // even tho its still look weird after resizing from mobile to dekstop when the modal open
  useResizeListener(() => {
    bodyElement.style.top = "0";
  });

  useEffect(() => {
    if (setIsHidden) {
      bodyElement.style.setProperty(
        "--st",
        -document.documentElement.scrollTop + "px"
      );

      // store scroll position after toggle being clicked
      setScrollTopPosition(document.documentElement.scrollTop);

      bodyElement.style.top = "var(--st, 0)";
      bodyElement.style.inlineSize = "100%";
      bodyElement.style.position = "fixed";
      bodyElement.style.overflowY = "scroll";
      bodyElement.style.width = "100%";
    } else {
      bodyElement.style.top = "unset";
      bodyElement.style.inlineSize = "unset";
      bodyElement.style.position = "unset";
      bodyElement.style.overflowY = "unset";
      bodyElement.style.width = "unset";

      // set back scrollPosition when modal closed
      document.documentElement.scrollTop = scrollTopPosition;
    }

    return () => {
      bodyElement.style.top = "unset";
      bodyElement.style.inlineSize = "unset";
      bodyElement.style.position = "unset";
      bodyElement.style.overflowY = "unset";
      bodyElement.style.width = "unset";
    };
    
  /* eslint-disable react-hooks/exhaustive-deps */
  }, [...deps]);
}

export { useOverflowHidden };
