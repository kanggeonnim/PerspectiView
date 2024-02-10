import { ArrowLeftToLine, ArrowRightToLine, User, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TeamCreate from "@/pages/workspace/components/TeamCreate";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "@/assets/main_logo.svg";
import logo_icon from "@/assets/main_logo_icon.svg";

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
import useTeamQueryModule from "@/hook/useTeamQueryModule";
import { useAuthStore } from "@/store/useAuthStore";
import { Progress } from "@ark-ui/react";
import useUserQueryModule from "@/hook/useUserQueryModule";

function UserSidebar() {
  // API 호출 시 사용
  const { teams, getTeamsIsSuccess } = useTeamQueryModule();
  console.log("getTeam", getTeamsIsSuccess, teams);
  const { getUser, getUserIsSuccess } = useUserQueryModule();
  console.log(getUser);

  const { user } = useAuthStore();
  console.log("usersidebaar", user);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState("");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  if (!getUserIsSuccess || !user) {
    return <div>Loading...</div>;
  }
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
                      isCollapsed ? "hidden" : " mx-auto text-sm font-bold text-left text-slate-700"
                    }
                  >
                    나의 워크스페이스
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Select
                  onValueChange={(team) => {
                    console.log("team_여기서 전역으로 관리하는 workspace 이름 바꾸기");
                    setSelectedTeam(
                      team.title.length > 10 ? team.title.slice(0, 10) + "..." : team.title
                    );
                    navigate(`/workspace/team/${team.id}`);
                  }}
                  className="block truncate w-44"
                >
                  <SelectTrigger className={isCollapsed ? "" : "font-bold truncate w-full "}>
                    <Users className="mr-2 text-primary" size={20} />
                    {!isCollapsed && (
                      <SelectValue className="font-bold truncatew-34" placeholder="팀 워크스페이스">
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
                      {teams?.map((team, index) => (
                        <SelectItem key={index} value={team} className="block w-full truncate">
                          {team.title}
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
          <Link to="/settings/profile">
            <div className="mx-2 my-2">
              <div className="flex items-center justify-between">
                <div className="px-1 mx-1">
                  <Avatar>
                    <AvatarImage src={user.userImageUrl} alt="user_image" />
                    <AvatarFallback>{user?.email.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>

                <div
                  className={
                    isCollapsed ? "hidden" : "flex flex-col items-start w-full text-sm font-bold"
                  }
                >
                  <div className="mx-1 text-xs break-words">{user.userNickname.split("_")[1]}</div>
                  <div className="mx-1 text-xs break-all text-zinc-600">{user.email}</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
