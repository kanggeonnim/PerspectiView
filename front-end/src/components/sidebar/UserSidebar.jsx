import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsLeft, ChevronsRight, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import TeamCreate from "@/pages/workspace/TeamCreate";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "@/assets/Logo.svg";
import logoIcon from "@/assets/LogoIcon.svg";

const teams = [
  {
    id: 1,
    name: "Team 1",
  },
  {
    id: 2,
    name: "Team 2",
  },
  {
    id: 3,
    name: "Team 3",
  },
  {
    id: 4,
    name: "Team 4",
  },
];

function UserSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // console.log(isCollapsed);
  };

  return isCollapsed ? (
    <div className="flex flex-col justify-between items-start border-r-2 h-dvh w-12 pl-3.5 ">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col items-start w-full">
        <div className="w-full my-3">
          <div className="flex items-center justify-start lg:flex-1">
            <img className="w-auto h-8" src={logoIcon} alt="logo" />
          </div>
        </div>
        <div className="flex flex-col justify-start w-full gap-4 my-3">
          {/* 나의 워크스페이스 */}
          <Link to={`/workspace`}>
            {/* 나의 워크스페이스 */}
            <div className="flex items-center justify-start w-full">
              {/* //TODO 아이콘 크기2개 다 */}
              <User color="#657dc4" />
            </div>
          </Link>

          {/* 팀 목록 섹션 */}
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center justify-start w-full">
              <Users color="#657dc4" />
            </div>
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
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
  ) : (
    <div className="flex flex-col items-center justify-between w-1/6 border border-r-2 border-blue-400">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col items-start w-5/6 h-full border border-red-400 ">
        <div className="w-full my-3">
          <div className="flex items-center justify-start lg:flex-1">
            <img className="w-auto h-8" src={logo} alt="logo" />
          </div>
        </div>
        <div className="flex flex-col justify-start w-full gap-4 my-3">
          {/* 나의 워크스페이스 */}
          <Link to={`/workspace`}>
            {/* 나의 워크스페이스 */}
            <div className="flex items-center justify-start w-full">
              {/* //TODO 아이콘 크기2개 다 */}
              <User color="#657dc4" />
              <div className="w-full mx-3 text-xs text-left text-slate-700">나의 워크스페이스</div>
            </div>
          </Link>
          {/* 팀 목록 섹션 */}
          <div className="flex flex-col items-start w-full">
            <div className="flex items-center justify-start w-full">
              <Users color="#657dc4" />
              <h4 className="w-full mx-3 text-xs text-left text-slate-700">나의 팀목록</h4>
              <div className="mx-2">
                <TeamCreate />
              </div>
            </div>
            <ScrollArea className="w-full pl-12 mt-1 h-96">
              {teams.map((team) => (
                <Link to={`/workspace/team/${team.id}`} key={team.id}>
                  <div className="mt-3 text-xs text-left text-zinc-600">{team.name}</div>
                </Link>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full py-3 ">
        <div className="flex items-center justify-start w-full m-3" onClick={toggleSidebar}>
          <ChevronsLeft size={16} color="#686464" />
          <div className="mx-3 text-xs text-left text-slate-700">Collapse</div>
        </div>
        <div className="flex flex-row items-center justify-start w-full py-3">
          <div className="mr-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-col items-start text-sm">
            <div className="m-1 text-xs text-left">작가명</div>
            <div className="m-1 text-xs text-left break-all text-zinc-600">user@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
