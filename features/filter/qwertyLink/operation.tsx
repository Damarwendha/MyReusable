"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function LinksOperation() {
  const useParams = useSearchParams();

  const { push } = useRouter();

  // The reason i seperate the URLSearchParams is to avoid using useMemo() because its too overkill
  const [q, setQ] = useState<string>(() => {
    const qParam = new URLSearchParams(useParams).get("q") || "";
    return qParam;
  });

  useEffect(() => {
    const params = new URLSearchParams(useParams);

    // Only execute when user not type anything after 500ms
    const timeoutId = setTimeout(() => {
      if (q === "") {
        params.delete("q");
      } else {
        params.set("q", q);
      }
      push(`?${params}`);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [q, push, useParams]);

  function handleQuery(value: string) {
    setQ(value);
  }

  return (
    <div className="relative w-max">
      <Input
        className="w-48 sm:w-96 ps-11 peer"
        onChange={(e) => handleQuery(e.target.value)}
        placeholder="Search Keyword"
        value={q}
      />
      <Search
        className="absolute transition-all duration-100 transform -translate-y-1/2 text-muted-foreground peer-focus:text-blue-500 left-3 top-1/2 bottom-1/2"
        size={20}
      />
    </div>
  );
}

export default LinksOperation;
