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
export default function ProductHeader() {
  return (
    <>
      <header className="bg-white">
        <nav
          className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8 min-w-64"
          aria-label="Global"
        >
          {/* 로고 */}
          <div className="flex items-center lg:flex-1">
            {/* <h1 className="text-3xl font-black text-primary-accent">시:작</h1> */}
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Features
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Marketplace
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Company
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
