import { useEffect } from "react";

function useOverflowHidden(
  isHiddenOverflow: boolean,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    const bodyElement = document.querySelector("html") as HTMLElement;

    if (isHiddenOverflow) {
      bodyElement.style.overflowY = "hidden";
    } else {
      bodyElement.style.overflowY = "unset";
    }

    return () => {
      bodyElement.style.overflowY = "unset";
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [...deps, isHiddenOverflow]);
}

export { useOverflowHidden };
