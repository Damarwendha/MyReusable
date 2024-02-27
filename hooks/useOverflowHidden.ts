import { useEffect } from "react";

// Q: Why didn't you simply use 'overflow: hidden' instead?
// A: The reason for this is that because overflow: hidden makes the site jump and take up the area where the scroll was.

function useOverflowHidden(
  isHiddenOverflow: boolean,
  deps: React.DependencyList = [],
  isNestedModal?: boolean
) {
  useEffect(() => {
    const bodyElement = document.querySelector("body") as HTMLElement;

    if (isHiddenOverflow) {
      bodyElement.style.overflowY = "hidden";
    } else if (isNestedModal) {
      bodyElement.style.overflowY = "hidden";
    } else {
      bodyElement.style.overflowY = "unset";
    }

    if (isNestedModal)
      return () => {
        bodyElement.style.overflowY = "hidden";
      };

    return () => {
      bodyElement.style.overflowY = "unset";
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [...deps, isHiddenOverflow, isNestedModal]);
}

export { useOverflowHidden };
