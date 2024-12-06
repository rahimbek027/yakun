import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import React from "react";

const BlogCom = () => {
  return (
    <div className="mt-[138px] px-4">
      <h2 className="text-center font-bold text-[30px] leading-[36px] text-[#3D3D3D] pb-[15px]">
        Our Blog Posts
      </h2>
      <p className="text-center font-normal text-[16px] leading-[24px] text-[#727272] pb-[35px]">
        We are an online plant shop offering a wide range of cheap and trendy
        plants.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {[
          "/blogCom-img1.jpg",
          "/blogCom-img2.jpg",
          "/blogCom-img3.jpg",
          "/blogCom-img4.jpg",
        ].map((src, index) => (
          <div key={index} className="w-full sm:w-[268px] flex-shrink-0">
            <Image
              src={src}
              alt="image"
              width={268}
              height={195}
              priority={true}
              className="w-full"
            />
            <span className="block pt-[9px] pe-[11px] pb-[12px] ps-[15px]">
              <p className="text-[#46A358] font-medium text-[14px] leading-[16px] pb-[4px]">
                September 12 | Read in 6 minutes
              </p>
              <h4 className="font-bold text-[20px] leading-[26px] text-[#3D3D3D] pb-[4px]">
                Cactus & Succulent Care Tips
              </h4>
              <p className="font-normal text-[14px] leading-[22px] text-[#727272] pb-[9px]">
                Cacti and succulents are easy plants for any home or patio.
              </p>
              <button className="duration-200 cursor-pointer hover:text-[#46A358] flex items-center">
                Read More <ArrowRightOutlined className="pl-[6px]" />
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCom;
