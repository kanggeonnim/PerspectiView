import ProductHeader from "@/components/header/ProductHeader";

export function PageLayout({children}) {

  return (
    
    <div className="flex flex-col w-5/6 h-full">
      <ProductHeader />
      {children}
    </div>


  );
}