"use client";

import { mainRoutes } from "@/constants/router";
import { checkCurrentRouter, cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="">
      <div className="fixed left-0 w-[280px] h-screen border-r">
        <div className="text-center text-3xl py-6">Apps List</div>
        <div className="flex flex-col p-4 gap-4">
          {mainRoutes.map((item) => (
            <Link
              className={cn(
                "flex items-center gap-2 text-gray-600 hover:text-black",
                checkCurrentRouter(item.path, pathname) &&
                  "font-bold text-black"
              )}
              href={item.path}
              key={item.path}
            >
              <item.icon />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div>test</div>
      <div className="ml-[280px] p-6">{children}</div>
    </div>
  );
};
export default DashboardLayout;
