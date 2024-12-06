"use client";

import { usePathname } from "next/navigation";
import React from "react";

const layout = ({ children }: any) => {
  const pathname = usePathname();
  return (
    <div className="container px-2 md:px-0">
      <h2 className="pt-[36px] font-normal text-[15px] leading-[16px]">
        <span className="font-bold">Home</span> / Shop{" "}
        {pathname.includes("order") ? " / Shopping Cart" : ""}
      </h2>
      {children}
    </div>
  );
};

export default layout;
