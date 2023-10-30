import { useState } from "react";

function TextExpander({
  children = "To customize your text and style, you should pass your text through children props and another props that i already provide",
  collapsedNumWords = 8,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "blue",
  defaultExpand = false,
  bgColor = "black",
  textColor = "white",
  className,
  borderRadius,
  border = "1px solid gray",
  padding = "10px",
  margin = "20px",
  onClickButton,
}: {
  children: any;
  collapsedNumWords: number;
  expandButtonText: string;
  collapseButtonText: string;
  buttonColor: string;
  defaultExpand: boolean;
  bgColor: string;
  textColor: string;
  className?: string;
  borderRadius?: string;
  border: string;
  padding: string;
  margin: string;
  onClickButton?: any;
}) {
  const [isExpand, setIsExpand] = useState(defaultExpand);

  const styles = {
    backgroundColor: bgColor,
    color: textColor,
    padding: padding,
    border,
    borderRadius,
    margin,
  };

  const displayText = children.split(" ").slice(0, collapsedNumWords).join(" ");

  return (
    <div className={className || ""} style={styles}>
      {isExpand ? children : displayText + "..."}
      <span
        style={{ cursor: "pointer", color: buttonColor }}
        onClick={onClickButton ? onClickButton : () => setIsExpand(!isExpand)}
      >
        {isExpand ? " " + collapseButtonText : " " + expandButtonText}
      </span>
    </div>
  );
}

export default TextExpander;
