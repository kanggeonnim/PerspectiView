export function PageLayout({children}) {

  // w-[99vw] h-[99vh]
  return (
    
    <div className="flex p-3 border justify-center items-center min-w-screen box-border">
      {children}
    </div>


  );
}