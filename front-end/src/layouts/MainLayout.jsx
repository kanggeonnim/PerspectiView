export function MainLayout({isHorizon}) {
  return(
    <div>
      { isHorizon ?
      <div className="flex">
        <div className="flex-auto">

        </div>
        <div className="flex-auto">

        </div>
        {/* TODO 여기에 사이드바 레이아웃 입력 */}
      </div>
        : 
      <div>
        <div>

        </div>
        <div>

        </div>
        {/* TODO 여기에 헤더 레이아웃 */}
      </div>  
       }
      {/* ALERT props로 클래스명을 받아와서 적용(수정사항) */}
    </div>

  )
}