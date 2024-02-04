import {
  Activity,
  ChevronDown,
  ChevronsLeft,
  Chrome,
  Plus,
  SendToBack,
  Users,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";

function ProductSidebar() {
  const { productId } = useParams();

  return (
    <div className="flex flex-col justify-between items-start border-r-2 h-dvh w-1/6 pl-3.5">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="flex flex-col items-start w-full">
        <div className="w-full my-3">
          <NavLink to="/workspace">
            <Chrome color="#657dc4" />
          </NavLink>
        </div>
        <div className="flex flex-col justify-start w-full gap-4 my-3">
          {/* 인물 */}
          <NavLink
            to={`/product/${productId}/character`}
            className={({ isActive }) =>
              isActive
                ? "*:active *:text-primary-accent *:bg-border"
                : "text-slate-700"
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
              isActive
                ? "*:active *:text-primary-accent *:bg-border"
                : "text-slate-700"
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
                isActive
                  ? "*:active *:text-primary-accent *:bg-border"
                  : "text-slate-700"
              }
            >
              <div className="flex items-center justify-start w-full hover:bg-border">
                <Activity color="#657dc4" />
                <h4 className="w-full mx-3 text-xs text-left text-slate-700">
                  작품 흐름
                </h4>
              </div>
            </NavLink>
            <div className="flex items-center justify-start w-full mx-3 mt-4">
              <ChevronDown size={20} color="#52525b" />
              <div className="w-full mx-3 text-xs text-left text-zinc-600">
                플롯
              </div>
              <Plus className="mr-8" size={20} color="#52525b" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full py-3 ">
        <div className="flex items-center justify-start w-full m-3 ">
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
