import { Activity, ChevronDown, ChevronsLeft, Chrome, Plus, SendToBack, Users } from 'lucide-react';

function ProductSidebar() {
  return (
    <div className="flex flex-col justify-between items-start border-r-2 h-dvh w-1/6 pl-3.5">
      {/* 사용자제외 섹션(사용자섹션을 밑으로 보내기 위함) */}
      <div className="w-full flex flex-col items-start">
        <div className="my-3 w-full">
          <Chrome color="#657dc4" />
        </div>
        <div className="w-full flex flex-col justify-start gap-4 my-3">
          {/* 인물 */}
          <div className="w-full flex justify-start items-center">
            <Users color="#657dc4"/>
            <div className="w-full text-left text-xs text-slate-700  mx-3">
              인물
            </div>
          </div>

          {/* 복선 */}
          <div className="w-full flex justify-start items-center">
            <SendToBack color="#657dc4"/>
            <h4 className="w-full text-left text-xs text-slate-700 mx-3">복선</h4>
          </div>

          {/* 작품 흐름 */}
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-start items-center">
              <Activity color="#657dc4"/>
              <h4 className="w-full text-left text-xs text-slate-700 mx-3">작품 흐름</h4>
            </div>
            <div className="w-full flex justify-start items-center mt-4 mx-3">
              <ChevronDown size={20} color="#52525b" />
              <div className="w-full text-left text-xs text-zinc-600 mx-3">플롯</div>
              <Plus className="mr-8" size={20} color="#52525b" />
            </div>
          </div>
        </div>
          
      </div>

 
        <div className=" w-full flex flex-col py-3">
          <div className=" w-full flex justify-start items-center m-3">
            <ChevronsLeft size={16} color="#686464" />
            <div className="text-left text-xs text-slate-700 mx-3">Collapse</div>
          </div>
          <div className="w-full flex flex-row justify-start items-center">
            <div className="mr-3">
              <img
                className="h-6 w-6 rounded-full"
                src="path-to-your-profile-image.jpg"
                alt=""
              />
            </div>  
            <div className="flex-col items-start text-sm">
              <div className="text-xs text-left m-1">작가명</div>
              <div className="break-all text-xs text-left text-slate-700 m-1">user@gmail.com</div>
            </div>
          </div>
        </div>
 
   
      
    </div>
  );
}

export default ProductSidebar;
