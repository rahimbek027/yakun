"use client";

import React, { useState } from "react";
import Link from "next/link";
const Reviews = () => {
  const [activeText, setActiveText] = useState<string>("");
  return (
    <div className="container pt-[92px]">
      <div className="flex items-center space-x-[30px] border-b border-[#46A35880] px-5 md:px0">
        <Link
          href="#description"
          onClick={() => setActiveText("description")}
          className={`text-[17px] leading-[16px] pb-[12px] ${
            activeText == "description"
              ? "font-bold border-b-[3px] border-[#46A358] text-[#46A358]"
              : ""
          }`}
        >
          Product Description
        </Link>
        <Link
          href="#reviews"
          onClick={() => setActiveText("reviews")}
          className={`text-[17px] leading-[16px] pb-[12px] ${
            activeText == "reviews"
              ? "font-bold border-b-[3px] border-[#46A358] text-[#46A358]"
              : ""
          }`}
        >
          Reviews (19)
        </Link>
      </div>
      <div className="w-full flex flex-col flex-wrap px-3 md:px-0 text-center md:text-start">
        <p className="font-normal text-[14px] leading-[24px] text-[#727272]  pt-[18px]">
          The ceramic cylinder planters come with a wooden stand to help elevate
          your plants off the ground. The ceramic cylinder planters come with a
          wooden stand to help elevate your plants off the ground. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec
          est tristique auctor. Donec non est at libero vulputate rutrum. Morbi
          ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate
          adipiscing cursus eu, suscipit id nulla. Pellentesque aliquet, sem
          eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis
          eros eget velit. Donec ac tempus ante.
        </p>
        <p className="font-normal text-[14px] leading-[24px] text-[#727272] pt-[20px]">
          Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis
          vulputate, sapien libero hendrerit est, sed commodo augue nisi non
          neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in
          accumsan elit odio quis mi. Cras neque metus, consequat et blandit et,
          luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula
          euismod eget. The ceramic cylinder planters come with a wooden stand
          to help elevate your plants off the ground.
        </p>
        <h5 className="font-bold text-[14px] leading-[24px] text-[#3D3D3D] pt-[18px]">
          Living Room:
        </h5>
        <p className="font-normal text-[14px] leading-[24px] text-[#727272]">
          The ceramic cylinder planters come with a wooden stand to help elevate
          your plants off the ground. The ceramic cylinder planters come with a
          wooden stand to help elevate your plants off the ground. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </p>
        <h5 className="font-bold text-[14px] leading-[24px] text-[#3D3D3D] pt-[18px]">
          Dining Room:
        </h5>
        <p className="font-normal text-[14px] leading-[24px] text-[#727272]">
          The benefits of houseplants are endless. In addition to cleaning the
          air of harmful toxins, they can help to improve your mood, reduce
          stress and provide you with better sleep. Fill every room of your home
          with houseplants and their restorative qualities will improve your
          life.
        </p>
        <h5 className="font-bold text-[14px] leading-[24px] text-[#3D3D3D] pt-[18px]">
          Office:
        </h5>
        <p className="font-normal text-[14px] leading-[24px] text-[#727272] pb-[127px]">
          The ceramic cylinder planters come with a wooden stand to help elevate
          your plants off the ground. The ceramic cylinder planters come with a
          wooden stand to help elevate your plants off the ground. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
};

export default Reviews;
