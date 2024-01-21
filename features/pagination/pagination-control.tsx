// SHADCN, TAILWIND
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PaginationControl({
  searchParams,
  totalPages,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  totalPages: number;
}) {
  const page = searchParams.page || 1;

  return (
    <Pagination>
      <PaginationContent>
        
{/*         only show previous btn and number one btn when currentPage > 1 */}
        {+page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href={`?page=${+page - 1}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`?page=${+page - 1}`}>
                {+page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        
{/*         current page */}
        <PaginationItem>
          <PaginationLink
            className="border-b-2 border-brand"
            href={`?page=${page}`}
          >
            {page}
          </PaginationLink>
        </PaginationItem>

{/*         only show latest page when it exits */}
        {totalPages !== +page && (
          <>
            <PaginationItem>
              <PaginationLink href={`?page=${+page + 1}`}>
                {+page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={`?page=${+page + 1}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationControl;
