import ProductHeader from "@/components/header/ProductHeader";
import { CharTab } from "@/pages/product/components/CharTab";

export function PageLayout() {

  return (
    
    <div className="flex flex-col w-5/6 h-full">
      <ProductHeader />
      {/* <StoryDialog /> */}
      <CharTab />
    </div>


  );
}