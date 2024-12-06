"use client";

import React, { useContext } from "react";
import { CustomImage } from "../components/CustomImage";
import { LikeBtn, OrderBasket, SearchIcon } from "@/assets/icon";
import axios from "axios";
import { URL } from "@/service/request";
import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "@/context/context";

interface PlantProductsType {
  item: any;
  setRefresh: (value: boolean) => void;
  refresh: boolean;
}

export const Product: React.FC<PlantProductsType> = ({
  item,
  setRefresh,
  refresh,
}) => {
  const { refreshContext, setRefreshContext } = useContext(Context);

  const handleLiked = (id: string) => {
    axios
      .post(
        `${URL}/like/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        toast.success("Saqlandi");
        setRefresh(!refresh);
      });
  };

  const handleBasket = (id: string) => {
    axios
      .post(
        `${URL}/basket`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("access_token"),
          },
        }
      )
      .then((response) => {
        toast.success("Saqlandi");
        setRefresh(!refresh);
        setRefreshContext(!refreshContext);
      });
  };

  return (
    <div>
      <li className="inline-block w-[258px]">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="product-box bg-[#FBFBFB] pt-[31px] pb-[18px] pl-[4px] pr-[4px] duration-150 hover:border-t-[1px] hover:border-[#46A358] relative overflow-hidden">
          <Link href={`/shop/${item?.product_id}`}>
            <CustomImage
              src={item.image_url ? item.image_url[0] : ""}
              alt="Product Image"
              width={250}
              height={250}
            />
          </Link>
          <ul className="product-icons flex items-center justify-center space-x-[10px] absolute left-0 right-0 -bottom-[40px] mx-auto duration-300">
            <li
              onClick={() => handleBasket(item.product_id)}
              className={`w-[35px] h-[35px] bg-[#ffffff] flex items-center justify-center cursor-pointer rounded-[4px] duration-150  ${
                item.basket ? "text-[#46A358]" : "text-slate-600"
              }`}
            >
              <OrderBasket />
            </li>
            <li
              onClick={() => handleLiked(item.product_id)}
              className={`w-[35px] h-[35px] bg-[#ffffff] flex items-center justify-center cursor-pointer rounded-[4px] duration-150 ${
                item.liked ? "text-slate-600" : "text-red-500"
              }`}
            >
              <LikeBtn />
            </li>
            <li
              className={`w-[35px] h-[35px] bg-[#ffffff] flex items-center justify-center cursor-pointer rounded-[4px] duration-150 hover:text-[#46A358]`}
            >
              <SearchIcon />
            </li>
          </ul>
          <span className="md:hidden w-[28px] h-[28px] bg-white flex items-center justify-center rounded-[50%] absolute top-[12px] right-[11px]">
            <IoMdHeartEmpty className="text-[#46A358]" />
          </span>
        </div>
        <h2 className="text-[16px] leading-[16px] text-[#3d3d3d] mt-[12px] mb-[6px]">
          {item.product_name}
        </h2>
        <p className="text-[#46A358] text-[18px] leading-[16px] font-bold">
          {item.cost}
        </p>
      </li>
    </div>
  );
};
