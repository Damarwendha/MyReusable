// CN
// V2
// ISSUE: Can't use addHref more than one
"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { upperCaseFirstLett } from "@/lib/utils";
import * as React from "react";
import { Link } from "@/lib/router-events";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IAddHref {
  pathname: string;
  href: string;
}

function BreadcrumbUI({
  title,
  addHref,
}: {
  title?: string;
  addHref?: IAddHref;
}) {
  const pathname = usePathname();

  const eachPathWrappedWithArray = pathname?.split("/");
  // Current Path
  const currPath = upperCaseFirstLett(
    eachPathWrappedWithArray?.at(eachPathWrappedWithArray?.length - 1) as string
  );

  // All path but without the current path
  const allPathExceptCurrPath = eachPathWrappedWithArray
    ?.filter((_, i) => i !== 0 && i !== eachPathWrappedWithArray?.length - 1)
    ?.map((path) => upperCaseFirstLett(path));

  return (
    <header className="flex flex-col">
      <span className="font-semibold text-muted-foreground">
        {title ? title : upperCaseFirstLett(currPath as string)}
      </span>
      <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground opacity-60">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className="hover-fade" href="/">
              <Home size={13} />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">Home</TooltipContent>
        </Tooltip>

        {allPathExceptCurrPath.map((str, i) => (
          <React.Fragment key={str}>
            {i === 0 ? <ChevronRight size={10} /> : null}

            {/* if addHref exits, render Link */}
            {addHref?.pathname === str ? (
              <Link className="hover:underline" href={addHref.href}>
                {str}
              </Link>
            ) : (
              <span>{str}</span>
            )}
            <ChevronRight size={10} />
          </React.Fragment>
        ))}
        <div>{title ? title : currPath}</div>
      </div>
    </header>
  );
}

export default BreadcrumbUI;


// TAILWIND
// V1
"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { upperCaseFirstLett } from "@/lib/utils";
import * as React from "react";
import Link from "next/link";

function BreadcrumbUI({ title }: { title?: string }) {
  const pathname = usePathname();

  const eachPathWrappedWithArray = pathname?.split("/");
  // Current Path
  const currPath = upperCaseFirstLett(
    eachPathWrappedWithArray?.at(eachPathWrappedWithArray?.length - 1) as string
  );

  // All path but without the current path
  const allPathExceptCurrPath = eachPathWrappedWithArray
    ?.filter((_, i) => i !== 0 && i !== eachPathWrappedWithArray?.length - 1)
    ?.map((path) => upperCaseFirstLett(path));

  return (
    <header className="flex flex-col">
      <span className="font-semibold text-muted-foreground">
        {title ? title : upperCaseFirstLett(currPath as string)}
      </span>
      <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground/50">
        <Link className="hover-fade" href="/" title="back to home">
          <Home size={13} />
        </Link>
        {allPathExceptCurrPath.map((str, i) => (
          <React.Fragment key={str}>
            {i === 0 ? <ChevronRight size={10} /> : null}
            <span>{str}</span>
            <ChevronRight size={10} />
          </React.Fragment>
        ))}
        <div>{title ? title : currPath}</div>
      </div>
    </header>
  );
}

export default BreadcrumbUI;
