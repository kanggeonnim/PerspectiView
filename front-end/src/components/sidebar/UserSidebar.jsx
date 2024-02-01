import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftToLine, ArrowRightToLine, ChevronDownIcon, User, Users } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import TeamCreate from "@/pages/workspace/TeamCreate";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import logo from "@/assets/Logo.svg";
import logo_icon from "@/assets/LogoIcon.svg";

import { Separator } from "../ui/separator";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { NavigationMenuSub } from "@radix-ui/react-navigation-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const teams = [
  {
    id: 1,
    name: "Team 111111111111111111111111111111111111112222222222222222222222222222222222",
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
  {
    id: 5,
    name: "Team 5",
  },
  {
    id: 6,
    name: "Team 6",
  },
  {
    id: 7,
    name: "Team 7",
  },
  {
    id: 8,
    name: "Team 8",
  },
  {
    id: 9,
    name: "Team 9",
  },
  {
    id: 10,
    name: "Team 10",
  },
  {
    id: 11,
    name: "Team 11",
  },
  {
    id: 12,
    name: "Team 12",
  },
  {
    id: 13,
    name: "Team 13",
  },
];

function UserSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [teamWorkspaceValue, setTeamWorkspaceValue] = useState("");

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // console.log(isCollapsed);
  };

  console.log(location);

  return (
    <div className="flex flex-col items-center justify-between min-h-fulL ">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col justify-between h-full m-2 border-2 rounded shadow-md w-max">
        <div className="mx-2 my-3 ">
          {/* 로고 */}
          <div className="flex justify-start px-1 mx-2 my-5 lg:flex-1 hover:bg-primary-foreground">
            <img className="h-8 " src={isCollapsed ? logo_icon : logo} alt="logo" />
          </div>

          {/* 워크스페이스 nav */}
          <NavigationMenu orientation="vertical" className="flex flex-col">
            <NavigationMenuList className="flex-col items-baseline">
              <NavigationMenuItem className="w-max">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href={`/workspace`}
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
              {isCollapsed ? (
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Users className="text-primary" size={20} />
                  </NavigationMenuLink>
                  <NavigationMenuContent>
                    {/* TODO: collapsed 됐을 때 팀 워크스페이스 메뉴 리스트 뜨도록 */}
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {teams.map((team) => (
                        <NavigationMenuLink key={team.id} title={team.id}>
                          {team.name}
                        </NavigationMenuLink>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <Select
                    onValueChange={(team) => {
                      setTeamWorkspaceValue(
                        team.name.length > 10 ? team.name.slice(0, 10) + "..." : team.name
                      );
                      navigate(`/workspace/team/${team.id}`);
                    }}
                    className="block truncate w-44"
                  >
                    <SelectTrigger className="font-bold truncate w-44 ">
                      <Users className="mr-2 text-primary" size={20} />
                      <SelectValue
                        className="font-bold truncate w-34"
                        placeholder="팀 워크스페이스"
                      >
                        {teamWorkspaceValue}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>나의 팀 목록</SelectLabel>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team} className="block truncate w-44">
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* <NavigationMenuTrigger className="group inline-flex h-9 w-full items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-background  hover:text-accent-foreground focus:bg-background  focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-background /50 data-[state=open]:bg-background /50">
                    <Users className="text-primary" size={20} />
                    <div className="mx-3 text-sm font-bold text-left text-slate-700">
                      팀의 워크스페이스
                    </div>
                    <ChevronDownIcon
                      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden="true"
                    />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ScrollArea className="rounded-md h-72 ">
                      <ul className="w-64 p-4 ">
                        {teams.map((team) => (
                          <NavigationMenuItem key={team.id}>
                            <NavigationMenuLink
                              href={`/workspace/team/${team.id}`}
                              active={location.pathname === `/workspace/team/${team.id}`}
                              className="block p-3 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-primary-light hover:text-accent-foreground focus:bg-primary-light focus:text-accent-foreground"
                            >
                              <div className="mx-3 text-sm font-bold text-left truncate text-slate-700">
                                {team.name}
                              </div>
                              <div className="text-sm font-bold leading-none">{team.name}</div> 
                            </NavigationMenuLink>
                            <Separator className="my-2" />
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </ScrollArea>
                  </NavigationMenuContent> */}
                </NavigationMenuItem>
              )}
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
      </div>
    </div>
  );
}

export default UserSidebar;
