import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsLeft, ChevronsRight, Chrome, Plus, User, Users } from "lucide-react";
import { useState } from "react";

const teams = [
  "Team 1",
  "Team 2",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 1",
  "Team 2",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
  "Team 3",
];

function UserSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
      setIsCollapsed(!isCollapsed);
      console.log(isCollapsed)
  };

  return (
    isCollapsed 
    ?
    <div className="flex flex-col justify-between items-start border-r-2 h-dvh w-12 pl-3.5">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className  ="flex flex-col items-start w-full">
        <div className="w-full my-3">
          <Chrome color="#657dc4" />
        </div>
        <div className="flex flex-col justify-start w-full gap-4 my-3">
          {/* 내 워크스페이스 */}
          <div className="flex items-center justify-start w-full">
            {/* //TODO 아이콘 크기2개 다 */}
            <User color="#657dc4" />
            {/* <div className="w-full mx-3 text-xs text-left text-slate-700">
              내 워크스페이스
            </div> */}
          </div>

          {/* 팀 목록 섹션 */}
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center justify-start w-full">
              <Users color="#657dc4" />
              {/* <div className="w-full mx-3 text-xs text-left text-slate-700">
                내 팀목록
              </div>
              <Plus className="mr-8" size={20} color="#52525b" /> */}
            </div>
            {/* <ScrollArea className="w-full pl-12 mt-1 h-96">
              <div className="">
                {teams.map((team, index) => (
                  <div
                    key={index}
                    className="mt-3 text-xs text-left text-zinc-600"
                  >
                    {team}
                  </div>
                ))}
              </div>
            </ScrollArea> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full py-3 ">
        <div className="flex items-center justify-start w-full m-3" onClick={toggleSidebar}>
          <ChevronsRight size={16} color="#686464" />
          {/* <div className="mx-3 text-xs text-left text-slate-700">Collapse</div> */}
        </div>
      <div className="flex flex-row items-center justify-start w-full py-3">
        <div className="mr-3">
          <img
            className="w-6 h-6 rounded-full"
            src="path-to-your-profile-image.jpg"
            alt=""
          />
        </div>
        {/* <div className="flex-col items-start text-sm">
          <div className="m-1 text-xs text-left">작가명</div>
          <div className="m-1 text-xs text-left break-all text-zinc-600">
            user@gmail.com
          </div>
        </div> */}
      </div>
    </div>
    </div>
    :
    <div className="flex flex-col justify-between items-start border-r-2 h-dvh w-1/6 pl-3.5">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col items-start w-full h-full">
        <div className="w-full my-3">
          <Chrome color="#657dc4" />
        </div>
        <div className="flex flex-col justify-start w-full gap-4 my-3">
          {/* 내 워크스페이스 */}
          <div className="flex items-center justify-start w-full">
            <User color="#657dc4" />
            <div className="w-full mx-3 text-xs text-left text-slate-700">
              내 워크스페이스
            </div>
          </div>

          {/* 팀 목록 섹션 */}
          <div className="flex flex-col items-start w-full border border-red-500">
            <div className="flex items-center justify-start w-full border border-red-500">
              <Users color="#657dc4" />
              <h4 className="w-full mx-3 text-xs text-left border border-red-500 text-slate-700">
                내 팀목록
              </h4>
              <Plus className="mr-8" size={20} color="#52525b" />
            </div>
            <ScrollArea className="w-full h-full pl-12 mt-1 border border-green-500">
              <div className="">
                {teams.map((team, index) => (
                  <div
                    key={index}
                    className="mt-3 text-xs text-left text-zinc-600"
                  >
                    {team}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-full py-3 ">
        <div className="flex items-center justify-start w-full m-3" onClick={toggleSidebar}>
          <ChevronsLeft size={16} color="#686464" />
          <div className="mx-3 text-xs text-left text-slate-700">Collapse</div>
        </div>
      <div className="flex flex-row items-center justify-start w-full py-3">
        <div className="mr-3">
          <img
            className="w-6 h-6 rounded-full"
            src="path-to-your-profile-image.jpg"
            alt=""
          />
        </div>
        <div className="flex-col items-start text-sm">
          <div className="m-1 text-xs text-left">작가명</div>
          <div className="m-1 text-xs text-left break-all text-zinc-600">
            user@gmail.com
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserSidebar;
