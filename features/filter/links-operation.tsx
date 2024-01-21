const TRIGGER_SEARCH_IN_MS = 500

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

    // Only executed when user not type anything after 500ms
    const timeoutId = setTimeout(() => {
      if (q === "") {
        params.delete("q");
      } else {
        params.set("q", q);
      }
      push(`?${params}`);
    }, TRIGGER_SEARCH_IN_MS);

    return () => clearTimeout(timeoutId);
  }, [q, push, useParams]);

  function handleQuery(value: string) {
    setQ(value);
  }

  return (
      <Input
        className="w-48 sm:w-96 ps-11 peer"
        onChange={(e) => handleQuery(e.target.value)}
        placeholder="Search Keyword"
        value={q}
      />
