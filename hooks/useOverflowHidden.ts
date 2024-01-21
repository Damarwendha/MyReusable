/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

// Q: Why didn't you simply use 'overflow: hidden' instead?
// A: The reason for this is that overflow: hidden makes the site jump and take up the area where the scroll was.

function useOverflowHidden(
  setIsHidden: boolean = true,
  deps: React.DependencyList = []
) {
  const [scrollTopPosition, setScrollTopPosition] = useState(0);

  useEffect(() => {
    const bodyElement = document.querySelector("body") as HTMLElement;

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
  }, deps);
}

export { useOverflowHidden };
