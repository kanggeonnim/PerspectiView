import { ArrowLeftToLine, ArrowRightToLine, User, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TeamCreate from "@/pages/workspace/components/TeamCreate";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "@/assets/Logo.svg";
import logo_icon from "@/assets/LogoIcon.svg";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const teams = Array.from({ length: 10 }, (_, index) => ({
  teamId: index,
  teamName: `Team ${index + 1}!!!!!!!!!!!!!!!!!!!!!!!!!`,
}));

function UserSidebar() {
  // API 호출 시 사용
  // const { teamData, getTeamIsSuccess } = useTeamQueryModule();

  // // 데이터 로딩 중일 때
  // if (!getTeamIsSuccess) {
  //   return <div>Loading...</div>;
  // }

  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState("");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 전역으로 관리하는 workspace 이름 바뀔때마다 해당하는 작품목록 불러오기
  // useEffect(() => {
  //   console.log();
  // }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-full ">
      {/* 사용 자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col justify-between h-full my-2 ml-2 mr-8 border rounded shadow-md w-max">
        <div className="mx-2 my-3 ">
          {/* 로고 */}
          <Link to={`/`}>
            <div className="flex justify-start px-1 mx-2 my-5 lg:flex-1 hover:bg-primary-foreground">
              <img className="h-8 " src={isCollapsed ? logo_icon : logo} alt="logo" />
            </div>
          </Link>
          {/* 워크스페이스 nav */}
          <NavigationMenu orientation="vertical" className="flex flex-col">
            <NavigationMenuList className="flex-col items-baseline">
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => {
                    console.log("my 전역으로 관리하는 workspace 이름 바꾸기");
                    navigate(`/workspace`);
                  }}
                  active={location.pathname === "/workspace"}
                >
                  <User className="text-primary" size={20} />

                  <div
                    className={
                      isCollapsed ? "hidden" : " mx-3 text-sm font-bold text-left text-slate-700"
                    }
                  >
                    나의 워크스페이스
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Select
                  onValueChange={(team) => {
                    console.log("team_여기서 전역으로 관리하는 workspace 이름 바꾸기");
                    setSelectedTeam(
                      team.teamName.length > 10 ? team.teamName.slice(0, 10) + "..." : team.teamName
                    );
                    navigate(`/workspace/team/${team.teamId}`);
                  }}
                  className="block truncate w-44"
                >
                  <SelectTrigger className={isCollapsed ? "" : "font-bold truncate w-44 "}>
                    <Users className="mr-2 text-primary" size={20} />
                    {!isCollapsed && (
                      <SelectValue
                        className="font-bold truncate w-34"
                        placeholder="팀 워크스페이스"
                      >
                        {selectedTeam}
                      </SelectValue>
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        <div className="flex items-center justify-between">
                          <div>나의 팀 목록</div>
                          <TeamCreate />
                        </div>
                      </SelectLabel>

                      {/* api 호출 시 */}
                      {/* <ul>
                        {teamData.map((team, index) => (
                          <li key={index}>
                            {team.title}
                            {team.info}
                          </li>
                        ))}
                      </ul> */}

                      {teams.map((team) => (
                        <SelectItem key={team.teamId} value={team} className="block w-40 truncate">
                          {team.teamName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-col justify-end w-full ">
          {/* collapse */}
          <div className="mx-5 my-2">
            <div className="flex items-center justify-start w-full px-1 " onClick={toggleSidebar}>
              {isCollapsed ? (
                <ArrowRightToLine size={20} className="text-primary" />
              ) : (
                <ArrowLeftToLine size={20} className="text-primary" />
              )}

              <div
                className={
                  isCollapsed ? "hidden" : "mx-3 text-xs font-bold text-left text-slate-700"
                }
              >
                닫기
              </div>
            </div>
          </div>

          {/* user profile */}
          <div className="mx-2 my-2">
            <div className="flex items-center justify-between">
              <div className="px-1 mx-1">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <div
                className={
                  isCollapsed ? "hidden" : "flex flex-col items-start w-full text-sm font-bold"
                }
              >
                <div className="mx-1 text-xs ">작가명</div>
                <div className="mx-1 text-xs break-all text-zinc-600">user@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
        <NavLink to="/settings/profile">
          <div className="flex-col items-start text-sm">
            <div className="m-1 text-xs text-left">작가명</div>
            <div className="m-1 text-xs text-left break-all text-slate-700">user@gmail.com</div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default UserSidebar;
