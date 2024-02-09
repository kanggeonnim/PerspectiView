import {
  Activity,
  ArrowLeftToLine,
  ArrowRightToLine,
  Contact2,
  Plus,
  PlusCircle,
  SendToBack,
  X,
} from "lucide-react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlotList from "./PlotList";
import logo from "@/assets/main_logo.svg";
import logo_icon from "@/assets/main_logo_icon.svg";
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
import { Input } from "../ui/input";
import { GradientPicker } from "./GradientPicker";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { Button } from "../ui/button";

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
  // const { productId } = useParams();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [addPlot, setAddPlot] = useState(false);
  const [background, setBackground] = useState(
    "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)"
  );
  const toggleAddPlot = (event) => {
    setAddPlot(!addPlot);
  };
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const teamId = 1;
  const productId = 1;

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
                    navigate(`/team/${teamId}/product/${productId}/character`);
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
                    navigate(`/team/${teamId}/product/${productId}/foreshadowing`);
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
                    navigate(`/team/${teamId}/product/${productId}/flow`);
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
                      <AccordionHeader className="flex items-center justify-between w-full ">
                        <AccordionTrigger className="flex flex-row-reverse justify-end w-full py-2 font-bold border-2">
                          <div className="flex items-center w-full px-8 border border-red-400 ">
                            <div className="w-full text-left text-nowrap">플롯</div>
                          </div>
                        </AccordionTrigger>

                        <div className="flex justify-end mx-2 border-2" onClick={toggleAddPlot}>
                          {addPlot ? (
                            <X
                              strokeWidth={2.5}
                              className="p-1 ro`unded-sm text-primary hover:bg-secondary-accent"
                            />
                          ) : (
                            <PlusCircle
                              strokeWidth={2.5}
                              className="p-1 rounded-sm text-primary hover:bg-secondary-accent"
                            />
                          )}
                        </div>
                      </AccordionHeader>
                      <AccordionContent className="ml-2">
                        <div className=""></div>

                        <ScrollArea className="min-w-full h-60">
                          {addPlot && (
                            <div
                            // onBlur={() => {
                            //   setAddPlot(false);
                            // }}
                            // className="flex items-center"
                            >
                              {/* <input
                                placeholder="플롯 이름"
                                className="flex-grow px-3 py-2 border border-gray-300 rounded-lg"
                              />
                              <div className="relative">
                                <GradientPicker
                                  className="absolute top-0 right-0 mt-1"
                                  background={background}
                                  setBackground={setBackground}
                                />
                              </div>
                              <Button className="ml-2">생성하기</Button> */}
                            </div>
                          )}
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
          <Link to="/settings/profile">
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
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductSidebar;
