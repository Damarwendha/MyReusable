import { useEffect } from 'react';

function useOverflowHidden(
  setIsHidden: boolean = true,
  deps: any[] = []
): void {
  useEffect(() => {
    const bodyStyle = document.querySelector('body')!.style;
    if (setIsHidden) {
      bodyStyle.overflow = 'hidden';
    } else {
      bodyStyle.overflow = 'visible';
    }

    return () => {
      bodyStyle.overflow = 'visible';
    };
  }, deps);
}

export { useOverflowHidden };
