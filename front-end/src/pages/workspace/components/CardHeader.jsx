import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchBar() {
  return (
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
  );
}

function CardHeader({ word }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-2xl font-bold">{word}</div>
      <SearchBar />
    </div>
  );
}

export default CardHeader;
