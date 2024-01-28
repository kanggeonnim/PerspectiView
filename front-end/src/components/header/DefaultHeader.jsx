import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import logo from "@/assets/logo.svg";
import { useRef } from "react";
function DefaultHeader(props) {
  return (
    <>
      <Drawer direction="top">
        <header className="bg-white">
          <nav
            className="flex items-center justify-between p-6 mx-auto max-w-9xl lg:px-8 min-w-64"
            aria-label="Global"
          >
            {/* 로고 */}
            <div className="flex items-center justify-start lg:flex-1">
              <img className="w-auto h-8" src={logo} alt="logo" />
              <h1 className="text-3xl font-black text-primary-accent">시:작</h1>
            </div>

            {/* 화면 축소 시, 검색 아이콘과 로그인 버튼  */}
            <div className="flex items-center justify-end">
              <div className="flex lg:hidden">
                <DrawerTrigger asChild>
                  <Search color="gray" />
                </DrawerTrigger>
              </div>
              {/* 검색 input */}
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search color="gray" />
                  </div>
                  <Input
                    type="text"
                    placeholder="팀을 검색해보세요"
                    className="block w-full rounded-md border-0 py-1.5 pl-11 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              {/* 로그인 버튼 */}
              <Button variant="default" className="ml-4 text-sm font-semibold leading-6 ">
                로그인
              </Button>
            </div>
          </nav>
        </header>
        <DrawerContent className="fixed inset-x-0 top-0 z-50 mb-24 flex h-auto flex-col rounded-b-[10px]  border-neutral-200 bg-white">
          <div className="w-full mx-auto">
            <DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center w-full space-x-2">
                  <div className="relative w-full rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search color="gray" />
                    </div>
                    <Input
                      type="text"
                      placeholder="팀을 검색해보세요"
                      className="block w-full rounded-md border-0 py-1.5 pl-11 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-foreground sm:text-sm sm:leading-6"
                    />
                  </div>
                  <DrawerClose asChild>
                    {/* <Button variant="outline">취소</Button> */}
                    <Button variant="outline">취소</Button>
                  </DrawerClose>
                </div>
                <div className="mt-3 h-[120px]">검색 결과</div>
              </div>
            </DrawerHeader>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DefaultHeader;
