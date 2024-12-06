"use client";

import {
  FacebookIcon,
  LikeIcon,
  LinkedinIcon,
  MessageIcon,
  TwitterIcon,
} from "@/assets/icon";
import { CustomImage } from "@/components/CustomImage";
import { URL } from "@/service/request";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Interested from "../page";
import { Rate } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SingleType {
  basket: boolean;
  category_id: string;
  cost: number;
  count: number;
  discount: number;
  image_url: string[];
  liked: boolean;
  product_description: string;
  product_id: string;
  product_name: string;
  product_status: string;
  short_description: string;
  size: string[];
  tags: string[];
}

const Page = ({ params }: any) => {
  const id = params.id;
  const [singleData, setSingleData] = useState<SingleType | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [count, setCount] = useState<number>(1);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(0, 0);
  };

  const router = useRouter()
  useEffect(() => {
    axios
      .get(`${URL}/product/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
      .then((response) => {
        setSingleData(response.data);
        // console.log(response.data);
        setActiveImage(response.data.image_url[0]);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [id]);

  if (!singleData) {
    return <div className="loader"></div>;
  }
  const handleAddToCart = async () => {
    await axios.post(`${URL}/basket`, { productId: id }, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })
    router.push("/shop/order")
  }

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const totalCost = singleData.cost * count;

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container py-12 px-4 md:py-24 mx-auto">
          <div className="mx-auto flex flex-col md:flex-row justify-center md:space-x-8 lg:space-x-12">
            <div className="flex items-center space-y-4 md:space-y-0 md:space-x-8 flex-col md:flex-row">
              <div className="flex flex-col justify-center items-start hidden md:block">
                <div className="flex flex-col justify-center items-start">
                  {[...Array(4)].map((_, index) => (
                    <Image
                      width={100}
                      height={100}
                      priority={true}
                      onClick={() => setActiveImage(singleData.image_url[0])}
                      key={index}
                      alt={`Image ${index + 1}`}
                      className="object-cover object-center w-[100px] h-[100px] rounded mb-2 duration-100 cursor-pointer hover:border-2 hover:border-green-500"
                      src={singleData.image_url[0]}
                    />
                  ))}
                </div>

              </div>
              <div className="relative">
                <img
                  src={"/search-icon.svg"}
                  alt="search"
                  className="text-[#3D3D3D] w-[15px] h-[15px] absolute top-0 right-0"
                />
                <CustomImage
                  width={400}
                  priority={false}
                  height={400}
                  alt={singleData.product_name}
                  src={activeImage || "https:dummyimage.com/400x400"}
                />
              </div>
            </div>
            <div className="max-w-[520px] w-full mt-8 md:mt-0">
              <h2 className="text-2xl md:text-[28px] font-bold leading-tight text-[#3D3D3D] pt-4 md:pt-0 text-center md:text-start">
                {singleData.product_name}
              </h2>
              <div className="flex items-center justify-between mt-8 md:mt-6 gap-x-8">
                <p className="font-semibold text-2xl text-[#46A358]">
                  ${totalCost.toFixed(2)}
                </p>
                <span className="flex items-center">
                  <Rate allowHalf defaultValue={4} />
                  <span className="font-normal text-sm md:text-[15px] text-[#3D3D3D] ml-2">
                    19 Customer Reviews
                  </span>
                </span>
              </div>
              <div className="border-t border-[#46a35931] mt-4 mb-4"></div>
              <h3 className="font-medium text-sm md:text-[15px] text-[#3D3D3D] pb-2">
                Short Description:
              </h3>
              <p className="font-normal text-sm md:text-[14px] text-[#727272] pb-6">
                {singleData.short_description}
              </p>
              <div className="">
                <h4 className="font-medium text-sm md:text-[15px] text-[#3D3D3D] pb-2">
                  Size:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {singleData.size.map((size, index) => (
                    <p
                      key={index}
                      className="font-bold text-lg cursor-pointer w-[35px] h-[35px] flex items-center justify-center rounded-full border-2 border-[#EAEAEA] hover:text-[#46A358] hover:border-[#46A358]"
                    >
                      {capitalizeFirstLetter(size)}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-6 flex-wrap">
                <div className="flex items-center justify-center md:justify-start space-x-4 w-full md:w-auto mb-[20px] md:mb-0">
                  <span
                    className="flex items-center justify-center w-8 h-10 bg-[#46A358] text-white rounded-full hover:opacity-90 curs1or-pointer"
                    onClick={handleDecrement}
                  >
                    <MinusOutlined />
                  </span>
                  <span>{count}</span>
                  <span
                    className="flex items-center justify-center w-8 h-10 bg-[#46A358] text-white rounded-full hover:opacity-90 cursor-pointer"
                    onClick={handleIncrement}
                  >
                    <PlusOutlined />
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={"/shop/order"}
                    className="border border-[#46A358] hover:bg-[#46A358] hover:text-white duration-300 cursor-pointer w-[130px] h-[40px] flex items-center justify-center rounded text-[#46A358] font-bold text-sm"
                  >
                    BUY NOW
                  </Link>
                  {/* <Link
                    href={"/shop/order"}
                    className="border border-[#46A358] hover:bg-[#46A358] hover:text-white duration-300 cursor-pointer w-[130px] h-[40px] flex items-center justify-center rounded text-[#46A358] font-bold text-sm"
                  >
                    ADD TO CART
                  </Link> */}
                  <button
                    onClick={handleAddToCart}
                    className="border border-[#46A358] hover:bg-[#46A358] hover:text-white duration-300 cursor-pointer w-[130px] h-[40px] flex items-center justify-center rounded text-[#46A358] font-bold text-sm"
                  >
                    ADD TO CART
                  </button>
                  <span className="flex items-center justify-center w-10 h-10 border border-[#46A358] rounded hover:text-white hover:bg-[#46A358] cursor-pointer">
                    <LikeIcon />
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <p className="font-normal text-sm text-[#727272] pb-2">
                  SKU: {singleData.product_id}
                </p>
                <h4 className="font-normal text-sm text-[#727272]">
                  Categories: {singleData.product_status}
                </h4>
                <span className="flex items-center flex-wrap gap-1 font-normal text-sm text-[#727272] pt-3 pb-4">
                  Tags:
                  {singleData.tags.map((tag, index) => (
                    <span key={index} className="text-sm text-[#3D3D3D]">
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <h4 className="font-medium text-sm text-[#3D3D3D]">
                  Share this product:{" "}
                </h4>
                <span className="flex items-center space-x-4">
                  <Link
                    className="hover:text-[#46A358] duration-300 cursor-pointer"
                    href={"https://facebook.com"}
                    target="_blank"
                  >
                    <FacebookIcon />
                  </Link>
                  <Link
                    className="hover:text-[#46A358] duration-300 cursor-pointer"
                    href={"https://twitter.com"}
                    target="_blank"
                  >
                    <TwitterIcon />
                  </Link>
                  <Link
                    className="hover:text-[#46A358] duration-300 cursor-pointer"
                    href={"https://linkedin.com"}
                    target="_blank"
                  >
                    <LinkedinIcon />
                  </Link>
                  <Link
                    className="hover:text-[#46A358] duration-300 cursor-pointer"
                    href={"https://.com"}
                    target="_blank"
                  >
                    <MessageIcon />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Interested />
    </>
  );
};

export default Page;
