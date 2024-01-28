import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';


function SearchBar() {
  return (
    <div className="flex items-center w-64">
      <Input className="w-full" type="{}" placeholder="작품을 검색해보세요" />
      <Search className="relative right-8" size={20} color="#4d4d4d" />
    </div>
  );
}


function CardHeader({word}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-2xl font-bold">{word}</div>
      <SearchBar />
    </div>
  );
}

export default CardHeader;