import {
  Activity,
  ChevronsLeft,
  ChevronsRight,
  Chrome,
  Plus,
  SendToBack,
  Users,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import SidebarAccordion from "./SidebarAccordion";

function ProductSidebar() {
  const plotDummy = {
    code: 204,
    message: "No Content",
    data: [
      {
        productId: "1",
        plotName: "발단",
        plotColorId: "2",
      },
      {
        productId: "2",
        plotName: "챕터1",
        plotColorId: "3",
      },
      {
        productId: "3",
        plotName: "챕터2",
        plotColorId: "1",
      },
      {
        productId: "1",
        plotName: "발단",
        plotColorId: "2",
      },
      {
        productId: "2",
        plotName: "챕터1",
        plotColorId: "3",
      },
      {
        productId: "3",
        plotName: "챕터2",
        plotColorId: "1",
      },
      {
        productId: "1",
        plotName: "발단",
        plotColorId: "2",
      },
      {
        productId: "2",
        plotName: "챕터111111",
        plotColorId: "3",
      },
      {
        productId: "3",
        plotName: "챕터2테스트테스트테스트아야ㅏ아아",
        plotColorId: "1",
      },
    ],
  };
  const storyDummy = {
    code: 204,
    message: "No Content",
    data: [
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
    ],
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return isCollapsed ? (
    <div className="flex flex-col justify-between items-start border-r-2 h-dvh w-12 pl-3.5">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col items-start w-full">
        <div className="w-full my-3">
          <Chrome color="#657dc4" />
        </div>
        <div className="flex flex-col justify-start w-full gap-4 my-3">
          {/* 인물 */}
          <div className="flex items-center justify-start w-full">
            <Users color="#657dc4" />
          </div>

          {/* 복선 */}
          <div className="flex items-center justify-start w-full">
            <SendToBack color="#657dc4" />
          </div>

          {/* 작품 흐름 */}
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-start w-full">
              <Activity color="#657dc4" />
            </div>
            {/* <div className="flex items-center justify-start w-full">
            <div className="w-full text-xs text-left text-zinc-600">
              플롯 생성
            </div>
            <Plus className="" size={20} color="#52525b" />
          </div> */}

            {/* <div>
            {plotDummy.data.map((plot, index) => (
              <SidebarAccordion
                key={index}
                plot={plot.plotName}
                stories={storyDummy}
              />
            ))}
          </div> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full py-3 ">
        <div
          className="flex items-center justify-start w-full m-3"
          onClick={toggleSidebar}
        >
          <ChevronsRight size={16} color="#686464" />
        </div>
        <div className="flex flex-row items-center justify-start w-full">
          <div className="mr-3">
            <img
              className="w-6 h-6 rounded-full"
              src="path-to-your-profile-image.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-start items-center justify-between w-1/6 border-r-2 h-dvh">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col items-start w-5/6">
        <div className="w-full my-3">
          <Chrome color="#657dc4" />
        </div>
        <div className="flex flex-col justify-start w-full gap-4 my-3 ">
          {/* 인물 */}
          <div className="flex items-center justify-start w-full">
            <Users color="#657dc4" />
            <div className="w-full mx-3 text-xs text-left text-slate-700">
              인물
            </div>
          </div>

          {/* 복선 */}
          <div className="flex items-center justify-start w-full ">
            <SendToBack color="#657dc4" />
            <h4 className="w-full mx-3 text-xs text-left text-slate-700">
              복선
            </h4>
          </div>

          {/* 작품 흐름 */}
          <div className="flex flex-col w-full border border-red-500">
            <div className="flex items-center justify-start w-full">
              <Activity color="#657dc4" />
              <h4 className="w-full mx-3 text-xs text-left text-slate-700">
                작품 흐름
              </h4>
            </div>
            <div className="flex items-center justify-start w-full">
              <div className="w-full text-xs text-left text-zinc-600">
                플롯 생성하기
              </div>
              <Plus className="" size={20} color="#52525b" />
            </div>
            <ScrollArea className="min-w-full h-96">
                {plotDummy.data.map((plot, index) => (
                  <SidebarAccordion
                    key={index}
                    plot={plot.plotName}
                    stories={storyDummy}
                  />
                ))}
            </ScrollArea>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full py-3 ">
        <div
          className="flex items-center justify-start w-full m-3"
          onClick={toggleSidebar}
        >
          <ChevronsLeft size={16} color="#686464" />
          <div className="mx-3 text-xs text-left text-slate-700">Collapse</div>
        </div>
        <div className="flex flex-row items-center justify-start w-full">
          <div className="mr-3">
            <img
              className="w-6 h-6 rounded-full"
              src="path-to-your-profile-image.jpg"
              alt=""
            />
          </div>
          <div className="flex-col items-start text-sm">
            <div className="m-1 text-xs text-left">작가명</div>
            <div className="m-1 text-xs text-left break-all text-slate-700">
              user@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSidebar;
