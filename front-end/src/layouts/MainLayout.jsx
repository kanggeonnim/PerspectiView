export function MainLayout({order, children}) {
 
    if (order === 'horizon') {
      return (
        <div className="flex flex-row w-[99vw] h-[99vh] box-border">
          <div>
            {/* TODO 사이드바를 여기에 */}
          </div>
          <div>
            BODY를 여기로
            {children}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="flex flex-col w-[99vw] h-[99vh] box-border">
          <div>
            {/* TODO 헤더를 여기에 */}
          </div>
          <div>
            {children}
          </div>
        </div>
      )

    }


}