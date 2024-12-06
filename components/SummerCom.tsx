import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import React from "react";

const SummerCom = () => {
  return (
    <div className="container px-2 md:px-0 pt-[94px] flex flex-wrap md:flex-nowrap gap-y-[28px] md:gap-y-0 justify-between gap-x-[28px]">
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right w-full md:w-auto">
        <Image alt="summer" src="/summer.png" width={292} height={292} />
        <div className="mt-[16px] md:mt-0 md:ml-[28px] w-full md:w-auto md:flex md:flex-col md:items-end">
          <h3 className="text-[20px] leading-[32px] font-extrabold pb-[16px] uppercase">
            Summer cactus & succulents
          </h3>
          <p className="text-[16px] leading-[28px] pb-[20px]">
            We are an online plant shop offering a wide range of cheap and
            trendy plants
          </p>
          <button className="text-white w-full md:w-auto px-[20px] py-[12px] bg-[#46A358] hover:bg-[#4ab35f] duration-300 cursor-pointer rounded-[6px] flex items-center justify-center mx-auto md:mx-0">
            Find More <ArrowRightOutlined className="ml-[8px]" />
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right w-full md:w-auto">
        <Image alt="summer" src="/styled.png" width={292} height={292} />
        <div className="mt-[16px] md:mt-0 md:ml-[28px] w-full md:w-auto md:flex md:flex-col md:items-end">
          <h3 className="text-[20px] leading-[32px] font-extrabold pb-[16px] uppercase">
            Summer cactus & succulents
          </h3>
          <p className="text-[16px] leading-[28px] pb-[20px]">
            We are an online plant shop offering a wide range of cheap and
            trendy plants
          </p>
          <button className="text-white w-full md:w-auto px-[20px] py-[12px] bg-[#46A358] hover:bg-[#4ab35f] duration-300 cursor-pointer rounded-[6px] flex items-center justify-center mx-auto md:mx-0">
            Find More <ArrowRightOutlined className="ml-[8px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummerCom;
