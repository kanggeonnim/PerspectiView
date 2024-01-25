import { ScrollArea } from "@/components/ui/scroll-area";

const teams = ["Team 1", "Team 2", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3","Team 3", "Team 3", "Team 3", "Team 3","Team 1", "Team 2", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3","Team 3", "Team 3", "Team 3", "Team 3"];

function UserSidebar() {
  return (
    <div className="flex flex-col justify-between items-start border-r-2 h-dvh w-1/6">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col items-start">
        <div className="text-left border-2 my-3">로고</div>

        {/* 내 워크스페이스 */}
        <div>
          <div className="flex justify-start items-center my-3">
            <div className="text-xs">이모지</div>
            <div className="text-left text-xs leading-none text-gray-900  mx-3">
              나의 워크스페이스
            </div>
          </div>
        </div>

        {/* 팀 목록 섹션 */}
        <div className="flex flex-col items-start">
          <div className="flex justify-start items-center my-3">
              <div className="text-xs">이모지</div>
              <h4 className="text-left text-xs mx-3">내 팀목록</h4>
          </div>
          <ScrollArea>
            <div className="">
              <ul className="space-y-1">
                {teams.map((team, index) => (
                  <li key={index} className="">
                    <div className="flex flex-row my-2">
                      <div className="text-xs">이모지</div>
                      <divc className="text-xs text-  left mx-3 text-gray-700 hover:text-blue-600 cursor-pointer">{team}</divc>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>
      </div>


      <div className="flex flex-col items-start">
        <div className="text-left border-2 inline ">로고</div>
        <div className="text-left border-2">asdjflkajsdf;alsdkjflsjdfjk</div>
      </div>



      {/* 사용자 프로필 섹션 */}
      {/* <div  className="flex flex-col justify-between items-start" > */}
        {/* <div className="flex flex-row items-center border-t border-gray-200">
          <div className="">
            <img
              className="h-4 w-4 rounded-full"
              src="path-to-your-profile-image.jpg"
              alt=""
            />
          </div>  
          <div className="flex-col items-start text-sm">
            <div className="text-xs text-left">사용자명</div>
            <div className="text-xs text-left">user@example.com</div>
          </div>
        </div> */}
      {/* </div> */}
      
    </div>
  );
}

export default UserSidebar;
