"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkType {
  id: number;
  title: string;
  path: string;
  isActive: boolean;
}

export const Navbar = () => {
  const pathname = usePathname();

  const navList = [
    {
      id: 1,
      title: "Home",
      path: "/",
      isActive: pathname == "/" ? true : false,
    },
    {
      id: 2,
      title: "Shop",
      path: "/shop",
      isActive: pathname.includes("/shop") ? true : false,
    },
    {
      id: 3,
      title: "Plant Care",
      path: "/plant",
      isActive: pathname == "/plant" ? true : false,
    },
    {
      id: 4,
      title: "Blogs",
      path: "/blogs",
      isActive: pathname == "/blogs" ? true : false,
    },
  ];

  return (
    <nav className="hidden md:block">
      <ul className="flex justify-center items-center gap-[25px]">
        {navList.map((item: LinkType) => (
          <Link
            className={`${item.isActive
              ? "font-bold border-b-[3.5px] border-[#46A358] "
              : "font-normal "
              } pb-[31px] text-[16px] leading-[20px]`}
            key={item.id}
            href={item.path}
          >
            {item.title}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
