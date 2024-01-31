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
import WorkList from "./WorkList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function WorkListCard() {
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
      <PaginationLink href={`#${totalPages}`} isActive={currentPage === totalPages}>
        {totalPages}
      </PaginationLink>
    </PaginationItem>
  );

  return (
    // don't set width,height here(effect on teamworkspace)
    <Card className="flex flex-col w-full h-full p-10">
      {/* CardHeader  */}
      <div className="flex items-center justify-between">
        {/* TODO: 워크스페이스 이름(팀/개인) */}
        <div className="text-2xl font-bold">{}</div>
        {/* SearchBar */}
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search color="gray" />
          </div>
          <Input
            type="search"
            placeholder="작품을 검색해보세요"
            className="block w-full rounded-md border-0 py-1.5 pl-11 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <WorkList />

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
