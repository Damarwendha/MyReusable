interface ILinks {
  id: number;
  title: string;
  src: string;
  shorten: string;
  created_at: string;
}

const links = [
  {
    id: 1,
    title: "Alight Motion AMV Template",
    src: "https://www.youtube.com/watch?v=RxfItbRhniafjpOHHIOErk",
    shorten: "https://qwertylink.com/HUHui873",
    created_at: "12/12/2021",
  },
  {
    id: 2,
    title: "Capcut Template Ampun Dijeeeeeeeeeeeeeeeee",
    src: "https://www.youtube.com/dipewjdopewpdBBOUDOeRxfItbRhnrk",
    shorten: "https://qwertylink.com/PojdIidw",
    created_at: "11/01/2024",
  },
  {
    id: 3,
    title: "Aplikasi DANA Mod",
    src: "https://www.dana.id/",
    shorten: "https://qwertylink.com/dnwkoIJ",
    created_at: "14/01/2024",
  },
  {
    id: 4,
    title: "books about how to get a girlfriend",
    src: "https://www.mediafire.com/watch?v=RxfItbRhniafjpOHHIOErk",
    shorten: "https://qwertylink.com/HUHui873",
    created_at: "16/01/2024",
  },
  {
    id: 5,
    title: "GTA 7 Mobile APK",
    src: "https://www.mediafire.com/watch?v=RxfItbRhniafjpOHHIOErk",
    shorten: "https://qwertylink.com/ue3u",
    created_at: "16/01/2024",
  },
];

function LinkList() {
  const useParams = useSearchParams();
  const params = new URLSearchParams(useParams);
  const qParam = params.get("q");

  let linksFiltered;
  if (qParam) {
    linksFiltered = links.reduce((acc, link) => {
      const linkValue = link.title + link.shorten + link.src + link.created_at;

        if (
          linkValue.toLocaleLowerCase().includes(qParam.toLocaleLowerCase())
        ) {
          acc.push(link);
          return acc;
        }

      return acc;
    }, [] as ILinks[]);
  } else {
    linksFiltered = links;
  }

  if (String(linksFiltered) === "") return <Empty />;

  return (
    <div className="flex flex-wrap gap-4">
      {linksFiltered.map(({ id, shorten, src, title, created_at }) => (
        <Card
          className="flex-1 w-full sm:min-w-[370px] mx-auto sm:mx-0"
          key={id}
        >
