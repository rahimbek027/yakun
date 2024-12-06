"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Button } from "../Button";
import "swiper/css/pagination";
import "./hero.css";
import "swiper/css";
import { BtnArrowIcon } from "@/assets/icon";
import { Navbar } from "../Navbar";

interface CaruselType {
  id: number;
  text: string;
  title: any;
  description: string;
}
const HeroMobile = () => {
  const heroData = [
    {
      id: 1,
      text: "Welcome to GreenShop",
      title: (
        <h2 className="mb-[3px] leading-[29px] text-[24px] text-[#3D3D3D] font-black">
          Let's Make a Better <span className="text-[#46A358]">Planet</span>
        </h2>
      ),
      description: "We are an online plant shop offering a wide range ",
    },
    {
      id: 2,
      text: "Welcome to GreenShop",
      title: (
        <h2 className="mb-[3px] leading-[29px] text-[24px] text-[#3D3D3D] font-black">
          Let's Make a Better <span className="text-[#46A358]">Planet</span>
        </h2>
      ),
      description: "We are an online plant shop offering a wide range ",
    },
    {
      id: 3,
      text: "Welcome to GreenShop",
      title: (
        <h2 className="mb-[3px] leading-[29px] text-[24px] text-[#3D3D3D] font-black">
          Let's Make a Better <span className="text-[#46A358]">Planet</span>
        </h2>
      ),
      description: "We are an online plant shop offering a wide range ",
    },
  ];

  return (
    <>
      <div className="md:hidden">
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper md:hidden"
        >
          {heroData.map((item: CaruselType) => (
            <SwiperSlide
              key={item.id}
              className="hero-mobile-banner pt-[23px] pb-[26px] flex items-center justify-start"
            >
              <div className="w-[206px] text-left">
                <p className="mb-[7px] text-[11px] leading-[16px] text-[#3D3D3D] font-medium">
                  {item.text}
                </p>
                {item.title}
                <p className="mb-[10px] font-normal text-[12px] leading-[18px]">
                  {item.description}
                </p>
                <Button
                  iconPosition="next"
                  icon={<BtnArrowIcon />}
                  bgBtn={true}
                  buttonWidth={88}
                  title="SHOP NOW"
                />
                <Navbar />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HeroMobile;
