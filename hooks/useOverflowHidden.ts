import { useEffect, useState } from "react";

// Q: Why didn't you simply use 'overflow: hidden' instead?
// A: The reason for this is that because overflow: hidden makes the site jump and take up the area where the scroll was.

function useOverflowHidden(
  isHiddenOverflow: boolean,
  deps: React.DependencyList = []
) {
  const [scrollTopPosition, setScrollTopPosition] = useState(
    document.documentElement.scrollTop
  );

  useEffect(() => {
    if (isHiddenOverflow) {
      setScrollTopPosition(document.documentElement.scrollTop);
    }
  }, [isHiddenOverflow]);

  useEffect(() => {
    const bodyElement = document.querySelector("body") as HTMLElement;

    if (isHiddenOverflow) {
      bodyElement.style.top = String(-scrollTopPosition) + "px";
      bodyElement.style.inlineSize = "100%";
      bodyElement.style.position = "fixed";
      bodyElement.style.overflowY = "scroll";
      bodyElement.style.width = "100%";
    } else {
      // set back scrollPosition when modal closed
      bodyElement.style.top = String(-scrollTopPosition) + "px";
      document.documentElement.scrollTop = scrollTopPosition;

      bodyElement.style.inlineSize = "unset";
      bodyElement.style.position = "unset";
      bodyElement.style.overflowY = "unset";
      bodyElement.style.width = "unset";
    }

    return () => {
      bodyElement.style.inlineSize = "unset";
      bodyElement.style.position = "unset";
      bodyElement.style.overflowY = "unset";
      bodyElement.style.width = "unset";
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [...deps, scrollTopPosition, isHiddenOverflow]);
}

export { useOverflowHidden };
