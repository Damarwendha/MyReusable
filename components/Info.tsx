import { cn } from "@/lib/utils";
import { CheckCheck, Info as InfoIcon } from "lucide-react";

function Info({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-4 sm:gap-0 bg-secondary rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

function WithIcon({
  children,
  icon,
  iconSize,
}: {
  children: React.ReactNode;
  icon: "info" | React.ReactNode;
  iconSize?: number;
}) {
  return (
    <div className="flex items-center">
      <i className="mr-3 box-content self-start">
        {icon === "info" ? (
          <InfoIcon
            color="var(--secondary)"
            fill="var(--brand)"
            role="img"
            {...(iconSize && { size: iconSize })}
          />
        ) : (
          icon
        )}
      </i>
      {children}
    </div>
  );
}

Info.WithIcon = WithIcon;

export default Info;
