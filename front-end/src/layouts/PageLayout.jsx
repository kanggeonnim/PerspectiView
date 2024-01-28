import ProductHeader from "@/components/header/ProductHeader";
import { StoryDialog } from "@/pages/product/components/StoryDialog";

export function PageLayout() {

  return (
    
    <div className="flex flex-col w-5/6">
      <ProductHeader />
      <StoryDialog />
    </div>


  );
}