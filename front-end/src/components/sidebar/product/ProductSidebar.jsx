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
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Plot from "./Plot";
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
import { Input } from "@/components/ui/input";
import { GradientPicker } from "./GradientPicker";
import { Button } from "../../ui/button";
import usePlotQueryModule from "@/hook/usePlotQueryModule";
import { useAuthStore } from "@/store/useAuthStore";
import { useProductStore } from "@/store/useProductStore";
import { usePlotListStore } from "@/store/plot/usePlotListStore";

function ProductSidebar() {
  const navigate = useNavigate();
  const { teamId, productId } = useParams();

  const { createPlot } = usePlotQueryModule(teamId, productId);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [addPlot, setAddPlot] = useState(false);

  const [newPlotName, setNewPlotName] = useState("");
  const [newPlotColor, setNewPlotColor] = useState("#ff75c3");
  const { user } = useAuthStore();
  const { product } = useProductStore();
  const { plotList, setPlotList } = usePlotListStore();

  useEffect(() => {
    if (product && product.plots) {
      setPlotList(product.plots);
    }
  }, [product, setPlotList]);

  const toggleAddPlot = () => {
    setAddPlot(!addPlot);
  };
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-full ">
      {/* 사용자 제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col justify-between h-full my-2 ml-2 mr-8 border rounded shadow-md w-max">
        <div className="mx-2 my-2">
          {/* 로고 */}
          <Link to={`/`} state={{ direct: false }}>
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
                      {plotList?.map((plot, index) => (
                        <Plot
                          key={index}
                          plotId={plot.plotId}
                          plotName={plot.plotName}
                          stories={plot.storyList}
                        />
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Accordion type="single" collapsible className="w-full pl-4 my-1">
                    <AccordionItem value="plots" className="w-full border-none">
                      <div className="flex items-center justify-between w-full ">
                        <AccordionTrigger className="flex flex-row-reverse justify-end w-full py-2 font-bold">
                          <div className="flex items-center w-full px-8 ">
                            <div className="w-full text-left text-nowrap">플롯</div>
                          </div>
                        </AccordionTrigger>

                        <div className="flex justify-end mx-2" onClick={toggleAddPlot}>
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
                      </div>
                      {addPlot && (
                        <div className="flex items-center ">
                          <div className="relative flex items-center">
                            <Input
                              placeholder="플롯 이름"
                              className="w-24 rounded-sm "
                              value={newPlotName}
                              onChange={(e) => setNewPlotName(e.target.value)}
                            />

                            <div className="absolute right-0 ">
                              <GradientPicker
                                plotColor={newPlotColor}
                                setPlotColor={setNewPlotColor}
                                type="add"
                              />
                            </div>
                          </div>
                          <Button
                            className="ml-2"
                            size="sm"
                            onClick={() => {
                              console.log({
                                plotName: newPlotName,
                                plotColor: newPlotColor,
                              });
                              // create plot
                              createPlot({
                                plotName: newPlotName,
                                plotColor: newPlotColor,
                              });
                            }}
                          >
                            생성
                          </Button>
                        </div>
                      )}
                      <AccordionContent className="ml-2">
                        <ScrollArea className="min-w-full h-60">
                          {plotList?.map((plot, index) => (
                            <Plot
                              key={index}
                              plotId={plot.plotId}
                              plotName={plot.plotName}
                              stories={plot.stories}
                              plotColor={plot.plotColor}
                            />
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
                    <AvatarImage src={user.userImageUrl} alt="user_image" />
                    <AvatarFallback>{user.email.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>

                <div
                  className={
                    isCollapsed ? "hidden" : "flex flex-col items-start w-full text-sm font-bold"
                  }
                >
                  <div className="mx-1 text-xs break-words">{user.nickname.split("_")[1]}</div>
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

export default ProductSidebar;
