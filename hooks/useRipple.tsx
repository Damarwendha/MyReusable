import { useState } from "react";

const MINIMUM_RIPPLE_SIZE = 100;

interface Ripple {
  key: number;
  style: React.CSSProperties;
}

type ShowRipple = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

export function useRipple(
  style?: React.CSSProperties
): [ShowRipple, React.ReactElement | null] {
  const [ripple, setRipple] = useState<Ripple | null>(null);

  const showRipple = (event: React.MouseEvent<HTMLElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const rippleSize = Math.min(
      event.currentTarget.clientHeight,
      event.currentTarget.clientWidth,
      MINIMUM_RIPPLE_SIZE
    );

    const newRipple: Ripple = {
      key: Date.now(),
      style: {
        display: "block",
        width: rippleSize,
        height: rippleSize,
        position: "absolute",
        left: x - rippleSize / 2,
        top: y - rippleSize / 2,
        background: "currentColor",
        borderRadius: "50%",
        opacity: 0.4,
        pointerEvents: "none",
        animationName: "useRippleAnimation",
        animationDuration: "0.7s",
        ...style,
      },
    };

    setRipple(newRipple);
    setTimeout(() => setRipple(null), 700); // Remove the ripple after animation duration
  };

  return [showRipple, ripple && <span key={ripple.key} style={ripple.style} />];
}
