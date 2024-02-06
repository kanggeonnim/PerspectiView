import {
  Activity,
  ArrowLeftToLine,
  ArrowRightToLine,
  Contact2,
  Plus,
  SendToBack,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlotList from "./PlotList";
import logo from "@/assets/Logo.svg";
import logo_icon from "@/assets/LogoIcon.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plotDummy = Array.from({ length: 10 }, (_, index) => ({
  plotId: index + 1,
  plotName: `발단 ${index + 1}`,
  plotColorId: "2",
}));

const storyDummy = Array.from({ length: 10 }, (_, index) => ({
  storyId: index + 1,
  plotId: index + 1,
  storyTitle: `주인공 등장 ${index + 1}`,
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
}));

// TODO: 플롯 추가/수정/삭제 이벤트
function ProductSidebar() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full ">
      {/* 사용자 제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col justify-between h-full my-2 ml-2 mr-8 border rounded shadow-md w-max">
        <div className="mx-2 my-2">
          {/* 로고 */}
          <Link to={`/`}>
            <div className="flex justify-start px-1 mx-2 my-5 lg:flex-1 hover:bg-primary-foreground">
              <img className="h-8 " src={isCollapsed ? logo_icon : logo} alt="logo" />
            </div>
          </Link>
          {/* 작품 nav */}
          <NavigationMenu orientation="vertical" className="flex flex-col justify-between w-full">
            <NavigationMenuList className="flex-col min-w-full ">
              {/* 인물 */}
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => {
                    navigate(`/product/${productId}/character`);
                  }}
                  active={location.pathname === `/product/${productId}/character`}
                >
                  <Contact2 className="text-primary" size={20} />
                  <div
                    className={
                      isCollapsed ? "hidden" : " mx-3 text-sm font-bold text-left text-slate-700"
                    }
                  >
                    인물
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* 복선 */}
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => {
                    navigate(`/product/${productId}/foreshadowing`);
                  }}
                  active={location.pathname === `/product/${productId}/foreshadowing`}
                >
                  <SendToBack className="text-primary" size={20} />
                  <div
                    className={
                      isCollapsed ? "hidden" : " mx-3 text-sm font-bold text-left text-slate-700"
                    }
                  >
                    복선
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* 작품 흐름 */}
              <NavigationMenuItem className="w-full ">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={() => {
                    navigate(`/product/${productId}/flow`);
                  }}
                  active={location.pathname === `/product/${productId}/flow`}
                >
                  <Activity className="text-primary" size={20} />
                  <div
                    className={
                      isCollapsed ? "hidden" : " mx-3 text-sm font-bold text-left text-slate-700"
                    }
                  >
                    작품 흐름
                  </div>
                </NavigationMenuLink>

                {isCollapsed ? (
                  <Select
                    onValueChange={(plot) => {
                      console.log(plot);
                    }}
                    className="block truncate w-44"
                  >
                    <SelectTrigger className="my-1">
                      <div className="font-bold">플롯</div>
                    </SelectTrigger>
                    <SelectContent className="px-2">
                      {plotDummy.map((plot, index) => (
                        <PlotList key={index} plotName={plot.plotName} stories={storyDummy} />
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Accordion type="single" collapsible className="w-full pl-4 my-1">
                    <AccordionItem value="plots" className="w-full border-none">
                      <AccordionTrigger className="flex flex-row-reverse justify-end w-full py-2 font-bold">
                        <div className="flex items-center justify-around w-full">
                          <div className="w-1/2 text-left text-nowrap">플롯</div>
                          <Plus className=" text-primary" size={15} />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="ml-2">
                        <ScrollArea className="min-w-full h-60">
                          {plotDummy.map((plot, index) => (
                            <PlotList key={index} plotName={plot.plotName} stories={storyDummy} />
                          ))}
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
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
          <NavLink to="/settings/profile">
            <div className="flex-col items-start text-sm">
              <div className="m-1 text-xs text-left">작가명</div>
              <div className="m-1 text-xs text-left break-all text-slate-700">
                user@gmail.com
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ProductSidebar;
