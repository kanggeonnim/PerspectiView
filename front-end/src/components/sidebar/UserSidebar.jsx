import { ScrollArea } from "@/components/ui/scroll-area";
import { Chrome, User, Users } from 'lucide-react';

const teams = ["Team 1", "Team 2", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3","Team 3", "Team 3", "Team 3", "Team 3","Team 1", "Team 2", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3", "Team 3","Team 3", "Team 3", "Team 3", "Team 3"];
 
function UserSidebar() {
  return (

    <div className="flex flex-col justify-between items-start border-r-2 h-dvh w-1/6 pl-3.5">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="w-full flex flex-col items-start">
        <div className="my-3 w-full">
          <Chrome color="#657dc4"/>
        </div>
        <div className="w-full flex flex-col justify-start gap-4 my-3">
        {/* 내 워크스페이스 */}
        <div className="w-full flex justify-start items-center">
          <User color="#657dc4"/>
          <div className="w-full text-left text-xs text-slate-700  mx-3">
            내 워크스페이스
          </div>
        </div>

        {/* 팀 목록 섹션 */}
        <div className="w-full flex flex-col items-start">
          <div className="w-full flex justify-start items-center">
            <Users color="#657dc4"/>
            <h4 className="w-full text-left text-xs text-slate-700 mx-3">내 팀목록</h4>
          </div>
          <ScrollArea className="h-96 w-full mt-1 pl-12">
            <div className= " ">
              {teams.map((team,index) => (
                <>
                  <div key={index} className="text-left text-xs text-zinc-600 mt-3">
                    {team}
                  </div>
                </>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      </div>
 
        <div className="w-full flex flex-row justify-start items-center py-3">
          <div className="mr-3">
            <img
              className="h-6 w-6 rounded-full"
              src="path-to-your-profile-image.jpg"
              alt=""
            />
          </div>  
          <div className="flex-col items-start text-sm">
            <div className="text-xs text-left m-1">작가명</div>
            <div className="break-all text-xs text-left text-zinc-600 m-1">user@gmail.com</div>
          </div>
        </div>
 
   
      
    </div>
  );
}

export default UserSidebar;
