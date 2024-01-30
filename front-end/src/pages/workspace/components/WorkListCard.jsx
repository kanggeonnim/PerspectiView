import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CardHeader from "./CardHeader";
import WorkList from "./WorkList";

function WorkListCard({ word, works }) {
  const totalPages = 10; // Set the total number of pages
  const currentPage = 7; // Set the current page
  const pageNeighbours = 1; // Number of adjacent pages to show around the current page

  const pages = [];

  // Define the start and end page numbers
  const startPage = Math.max(2, currentPage - pageNeighbours);
  const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

  // Add the first page
  pages.push(
    <PaginationItem key={1}>
      <PaginationLink href={`#1`} isActive={currentPage === 1}>
        1
      </PaginationLink>
    </PaginationItem>
  );

  // Ellipsis for hiding pages before current page section
  if (startPage > 2) {
    pages.push(
      <PaginationItem key="start-ellipsis">
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  // Page numbers around the current page
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <PaginationItem key={i}>
        <PaginationLink href={`#${i}`} isActive={i === currentPage}>
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  // Ellipsis for hiding pages after current page section
  if (endPage < totalPages - 1) {
    pages.push(
      <PaginationItem key="end-ellipsis">
        <PaginationEllipsis />
      </PaginationItem>
    );
  }

  // Add the last page
  pages.push(
    <PaginationItem key={totalPages}>
      <PaginationLink
        href={`#${totalPages}`}
        isActive={currentPage === totalPages}
      >
        {totalPages}
      </PaginationLink>
    </PaginationItem>
  );

  return (
    // don't set width,height here(effect on teamworkspace)
    <Card className="flex flex-col w-full h-full p-10">
      <CardHeader word={word} />
      <WorkList works={works} />

      <Pagination className="">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {pages}
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  );
}

export default WorkListCard;
