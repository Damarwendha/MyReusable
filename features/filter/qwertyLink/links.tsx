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
