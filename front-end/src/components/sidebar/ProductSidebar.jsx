import {
  Activity,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  SendToBack,
  Users,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import SidebarAccordion from "./SidebarAccordion";
import logo from "@/assets/Logo.svg";
import logoIcon from "@/assets/LogoIcon.svg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const plotDummy = [
  {
    plotId: "1",
    plotName: "발단",
    plotColorId: "2",
  },
  {
    plotId: "2",
    plotName: "챕터1",
    plotColorId: "3",
  },
  {
    plotId: "3",
    plotName: "챕터2",
    plotColorId: "1",
  },
];

const storyDummy = [
  {
    storyId: "111",
    plotId: "1",
    storyTitle: "주인공 등장",
    storyContent: "화이트 드래곤이 울부짖었다 크아아앙",
    characList: [
      {
        id: "juingong21",
      },
      {
        id: "whitedragon",
      },
    ],
    position_x: 0,
    position_y: 10,
  },
  {
    storyId: "112",
    plotId: "1",
    storyTitle: "주인공 퇴장",
    storyContent: "화이트 드래곤이 죽었다",
    characList: [
      {
        id: "juingong21",
      },
      {
        id: "whitedragon",
      },
    ],
    position_x: 0,
  },
];

function ProductSidebar() {
  const { productId } = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return isCollapsed ? (
    <div className="flex flex-col w-full py-3 ">
      <div className="flex items-center justify-start w-full m-3" onClick={toggleSidebar}>
        <ChevronsRight size={16} color="#686464" />
      </div>
      <div className="flex flex-row items-center justify-start w-full">
        <div className="mr-3">
          <div className="flex items-center justify-start lg:flex-1">
            <img className="w-auto h-8" src={logoIcon} alt="logo" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-between items-start border-r-2 h-dvh w-12 pl-3.5">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col items-start w-full">
        <div className="w-full my-3">
          <div className="flex items-center justify-start lg:flex-1">
            <img className="w-auto h-8" src={logo} alt="logo" />
          </div>
        </div>
        <div className="flex flex-col justify-start w-full gap-4 my-3">
          {/* 인물 */}
          <NavLink
            to={`/product/${productId}/character`}
            className={({ isActive }) =>
              isActive ? "*:active *:text-primary-accent *:bg-border" : "text-slate-700"
            }
          >
            <div className="flex items-center justify-start w-full hover:bg-border">
              <Users color="#657dc4" />
              <div className="w-full mx-3 text-xs text-left">인물</div>
            </div>
          </NavLink>

          {/* 복선 */}
          <NavLink
            to={`/product/${productId}/foreshadowing`}
            className={({ isActive }) =>
              isActive ? "*:active *:text-primary-accent *:bg-border" : "text-slate-700"
            }
          >
            <div className="flex items-center justify-start w-full hover:bg-border">
              <SendToBack color="#657dc4" />
              <h4 className="w-full mx-3 text-xs text-left">복선</h4>
            </div>
          </NavLink>

          {/* 작품 흐름 */}
          <div className="flex flex-col w-full">
            <NavLink
              to={`/product/${productId}/flow`}
              className={({ isActive }) =>
                isActive ? "*:active *:text-primary-accent *:bg-border" : "text-slate-700"
              }
            >
              <div className="flex items-center justify-start w-full hover:bg-border">
                <Activity color="#657dc4" />
                <h4 className="w-full mx-3 text-xs text-left text-slate-700">작품 흐름</h4>
              </div>
            </NavLink>
            <div className="flex items-center justify-start w-full mx-3 mt-4">
              <ChevronDown size={20} color="#52525b" />
              <div className="w-full mx-3 text-xs text-left text-zinc-600">플롯</div>
              <Plus className="mr-8" size={20} color="#52525b" />
            </div>
            <ScrollArea className="min-w-full h-96">
              {plotDummy.map((plot, index) => (
                <SidebarAccordion key={index} plot={plot.plotName} stories={storyDummy} />
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
            <div className="m-1 text-xs text-left break-all text-slate-700">user@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSidebar;
