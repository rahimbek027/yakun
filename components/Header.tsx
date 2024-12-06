"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, ChangeEvent, MouseEvent, useContext } from "react";
import { Navbar } from "./Navbar";
import {
  SearchIcon,
  OrderBasket,
  LoginIcon,
  HamburgerButtonIcon,
} from "@/assets/icon";
import { Button } from "./Button";
import { usePathname, useRouter } from "next/navigation";
import LoginModal from "./Login";
import { Toaster } from "react-hot-toast";
import { Badge } from "antd";
import { Context } from "@/context/context";
interface LinkType {
  id: number;
  title: string;
  path: string;
  isActive: boolean;
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const { basketList } = useContext(Context);
  const [searchInput, setSearchInput] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const router = useRouter()

  const navList: LinkType[] = [
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
      isActive: pathname == "/shop" ? true : false,
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
  const access_token = localStorage.getItem("access_token")

  const handleSearchChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setTimeout(() => {
        setSearchInput(false);
      }, 2000);
    }
  };

  const closeModal = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "modal-wrapper") {
      setOpenModal(false);
    }
  };

  const handleLeaveAccount = () => {
    const confirmLogout =
      window.confirm(
        "Siz chindan ham akkountingizni tark etmoqchimisiz ?"
      );

    if (confirmLogout) {
      localStorage.clear()
      router.push("/logout");
    }
  }

  return (
    <header className="pt-[22px] md:pt-[25px] fixed w-full z-[1000] bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container md:border-b-[1px] gap-[8px] border-[#A2D0AB] px-[24px] flex items-center justify-between">
        <Link className="hidden md:block pb-[17px]" href={"/"}>
          <Image
            src={"/site-logo.svg"}
            width={150}
            height={34}
            alt="site-logo"
            priority={true}
          />
        </Link>
        <Navbar />
        <div className="hidden md:flex items-center space-x-[30px] pb-[11px]">
          <button
            className="flex items-center"
            onClick={() => setSearchInput(true)}
          >
            {!searchInput && <SearchIcon />}
            <input
              onChange={handleSearchChangeInput}
              className={`${searchInput ? "py-[14px] pl-[41px] w-[300px]" : "w-[0px]"
                } search-input duration-300 outline-none focus:shadow text-[14px] font-normal leading-[16px] bg-[#F8F8F8] rounded-[10px] `}
              type="text"
              placeholder="Find your plants"
              autoComplete="off"
              aria-label="Find your plants"
              name="plants-search"
            />
          </button>
          <Badge
            style={{ color: "white", backgroundColor: "#46A258" }}
            size="default"
            count={basketList?.length}
          >
            <Link className="hover:text-[#46A258]" href={"/shop/order"}>
              <OrderBasket />
            </Link>
          </Badge>
          {!access_token ? <Button
            onClick={() => setLoginModal(true)}
            bgBtn={false}
            title="Login"
            iconPosition="prev"
            icon={<LoginIcon />}
            buttonWidth={100}
          /> : <Button
            onClick={handleLeaveAccount}
            bgBtn={false}
            title="Logout"
            iconPosition="prev"
            icon={<LoginIcon />}
            buttonWidth={100}
          />
          }
        </div>
        <input
          className="block md:hidden py-[14px] pl-[41px] w-[90%] search-input duration-300 outline-none focus:shadow text-[14px] font-normal leading-[16px] bg-[#F8F8F8] rounded-[10px]"
          type="text"
          placeholder="Find your plants"
          autoComplete="off"
          aria-label="Find your plants"
          name="plants-search"
        />
        <button
          onClick={() => setOpenModal(true)}
          className="md:hidden w-[45px] h-[45px] bg-[#46A258] rounded-[14px] shadow flex items-center justify-center opacity-90"
        >
          <HamburgerButtonIcon />
        </button>
      </div>
      <div
        onClick={closeModal}
        id="modal-wrapper"
        className={`${openModal ? "left-0" : "left-[-100%]"
          } modal duration-500 fixed top-0 z-[2] backdrop-blur-md h-[100vh] w-full`}
      >
        <div
          className={`absolute w-[80%] h-[100vh] bg-[#46A258] opacity-90 duration-500 ${openModal ? "right-0" : "right-[-200%]"
            } p-5 flex flex-col gap-[clamp(0.5rem, 0.42rem + 0.43vw, 0.625rem)] space-y-5`}
        >
          {navList.map((item: LinkType) => (
            <Link
              onClick={() => setOpenModal(false)}
              className={`font-normal p-[10px] text-[16px] leading-[20px] text-white rounded-lg ${item.isActive ? "bg-[#ffffff49]" : "bg-transparent"}`}
              key={item.id}
              href={item.path}
            >
              <p className="text-center">{item.title}</p>
            </Link>
          ))}
          <div className="flex items-center justify-center space-x-5">
            <Badge
              style={{ color: "white", backgroundColor: "#46A258" }}
              size="default"
              count={basketList?.length}
            >
              <Link
                className="text-white hover:text-[#46A258]"
                href={"/shop/order"}
              >
                <OrderBasket />
              </Link>
            </Badge>
            {!access_token ? <Button
              onClick={() => setLoginModal(true)}
              bgBtn={false}
              title="Login"
              iconPosition="prev"
              icon={<LoginIcon />}
              buttonWidth={100}
            /> : <Button
              onClick={() => router.push("/logout")}
              bgBtn={false}
              title="Logout"
              iconPosition="prev"
              icon={<LoginIcon />}
              buttonWidth={100}
            />}
          </div>
        </div>
      </div>
      <LoginModal isOpen={loginModal} onClose={() => setLoginModal(false)} />
    </header>
  );
};

export default Header;
