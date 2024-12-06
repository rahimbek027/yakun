"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { CustomImage } from "../../components/CustomImage";
import Reviews from "@/components/Reviews";

interface InterestedType {
  id: number;
  text: string;
  price: string;
  image: string;
}

function Interested() {
  const InterestedData: InterestedType[] = [
    {
      id: 1,
      text: "Beach Spider Lily",
      price: "$129.00",
      image: "/image7.png",
    },
    {
      id: 2,
      text: "Blushing Bromeliad",
      price: "$139.00",
      image: "/image2.png",
    },
    {
      id: 3,
      text: "Aluminum Plant",
      price: "$179.00",
      image: "/image3.png",
    },
    {
      id: 4,
      text: "Bird's Nest Fern",
      price: "$99.00",
      image: "/image4.png",
    },
    {
      id: 5,
      text: "Chinese Evergreen",
      price: "$39.00",
      image: "/image5.png",
    },
    {
      id: 6,
      text: "Chinese Evergreen",
      price: "$39.00",
      image: "/image6.png",
    },
    {
      id: 7,
      text: "Beach Spider Lily",
      price: "$129.00",
      image: "/image7.png",
    },
    {
      id: 8,
      text: "Blushing Bromeliad",
      price: "$139.00",
      image: "/image2.png",
    },
    {
      id: 9,
      text: "Aluminum Plant",
      price: "$179.00",
      image: "/image3.png",
    },
    {
      id: 11,
      text: "Bird's Nest Fern",
      price: "$99.00",
      image: "/image4.png",
    },
    {
      id: 12,
      text: "Chinese Evergreen",
      price: "$39.00",
      image: "/image5.png",
    },
    {
      id: 13,
      text: "Chinese Evergreen",
      price: "$39.00",
      image: "/image6.png",
    },
    {
      id: 14,
      text: "Bird's Nest Fern",
      price: "$99.00",
      image: "/image4.png",
    },
    {
      id: 15,
      text: "Chinese Evergreen",
      price: "$39.00",
      image: "/image5.png",
    },
    {
      id: 16,
      text: "Chinese Evergreen",
      price: "$39.00",
      image: "/image6.png",
    },
  ];

  const SwiperData = (data: InterestedType[], size: number) => {
    const datas = [];
    for (let i = 0; i < data.length; i += size) {
      datas.push(data.slice(i, i + size));
    }
    return datas;
  };

  const SwiperDataSlider = SwiperData(InterestedData, 5);

  return (
    <>
      <Reviews />
      <div className="container bg-white no-background-image">
        <h2 className="font-bold text-[17px] leading-[16px] text-[#46A358]">
          You may be interested in
        </h2>
        <div className="border-b border-[#46a35943] pb-[12px]"></div>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination, Autoplay]}
        >
          {InterestedData.map((item: InterestedType) => (
            <SwiperSlide
              key={item.id}
              className="flex justify-center items-center"
            >
              <div className="bg-white">
                <div className="bg-[#FBFBFB] px-[4px] py-[20px] flex items-center justify-center">
                  <CustomImage
                    alt={item.text}
                    height={200}
                    width={190}
                    src={item.image}
                  />
                </div>
                <p className="mt-3 text-center font-normal text-sm md:text-base leading-4">
                  {item.text}
                </p>
                <p className="text-center text-[#46A358] text-base md:text-lg leading-4 font-bold mt-1">
                  {item.price}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Interested;
