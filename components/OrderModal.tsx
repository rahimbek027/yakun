"use client";

import React, { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { CustomImage } from "./CustomImage";
import { Context } from "@/context/context";
import { Button } from "./Button";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BasketListType {
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

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const { basketList } = useContext(Context);

  const calculateTotalCost = () => {
    let subtotal = 0;
    basketList.forEach((item: BasketListType) => {
      subtotal += item.cost * item.count;
    });
    return subtotal.toFixed(2);
  };

  const totalCost = parseFloat(calculateTotalCost());
  const shippingCost = 16.0;
  const finalTotal = (totalCost + shippingCost).toFixed(2);

  const handleTrackOrder = () => {
    alert("Salomat");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isOpen && (
        <div className="fixed top-0 left-0 w-full  bg-black bg-opacity-50 backdrop-blur-sm  h-[100vh] flex items-center justify-center z-50">
          <div className="bg-white w-[578px] rounded-lg h-[100vh] overflow-y-scroll">
            <div className="bg-[#46A3580F] flex flex-col items-center border-b-[2px] border-[#46A3580F] pt-[29px] relative">
              <CustomImage
                src="/thank-you.svg"
                width={65}
                height={80}
                alt="thank-you"
                priority={true}
              />
              <p className="font-normal text-[16px] leading-[16px] pt-[16px] pb-[15px]">
                Your order has been received
              </p>
              <CloseOutlined
                onClick={onClose}
                className="absolute top-[20px] right-[17px] cursor-pointer"
              />
            </div>
            <div className="px-[40px] py-[15px] border-b-[2px] border-[#46A35833]">
              <div className="flex items-center justify-between w-full ">
                <div className="border-r border-[#46A35833] pr-[22px]">
                  <p className="font-normal text-[14px] leading-[16px] text-[#727272]">
                    Order Number
                  </p>
                  <h5 className="font-bold text-[15px] leading-[16px] text-[#727272] pt-[3px]">
                    19586687
                  </h5>
                </div>
                <div className="border-r border-[#46A35833] pr-[22px]">
                  <p className="font-normal text-[14px] leading-[16px] text-[#727272]">
                    Date
                  </p>
                  <h5 className="font-bold text-[15px] leading-[16px] text-[#727272] pt-[3px]">
                    15 Sep, 2021
                  </h5>
                </div>
                <div className="border-r border-[#46A35833] pr-[22px]">
                  <p className="font-normal text-[14px] leading-[16px] text-[#727272]">
                    Total
                  </p>
                  <h5 className="font-bold text-[15px] leading-[16px] text-[#727272] pt-[3px]">
                    2,699.00
                  </h5>
                </div>
                <div className="">
                  <p className="font-normal text-[14px] leading-[16px] text-[#727272]">
                    Payment Method
                  </p>
                  <h5 className="font-bold text-[15px] leading-[16px] text-[#727272] pt-[3px]">
                    Cash on delivery
                  </h5>
                </div>
              </div>
            </div>
            <div className="px-[40px] py-[15px] ">
              <h3 className="pt-[18px] font-bold text-[15px] leading-[16px] text-[#3D3D3D]">
                Order Details
              </h3>
              <div className="flex items-center justify-between pt-[12px]">
                <p className="">Products</p>
                <span className="flex items-center space-x-[110px]">
                  <p>Qty</p>
                  <p>Subtotal</p>
                </span>
              </div>
              {basketList.map((item: BasketListType) => (
                <div
                  key={item.product_id}
                  className="flex items-center pt-[11px] bg-[#FBFBFB] mb-[10px] mt-[11px]"
                >
                  <CustomImage
                    src={item.image_url ? item.image_url[0] : ""}
                    alt={item.product_name}
                    width={70}
                    height={70}
                  />
                  <div className="w-full flex items-center justify-between pl-[11px]">
                    <span>
                      <p className="font-semibold text-[16px] leading-[16px]">
                        {item.product_name}
                      </p>
                      <p className="text-[14px] leading-[16px] text-[#727272] pt-[6px]">
                        SKU: {item.product_id.slice(0, 10)}
                        {item.product_id.length > 10 ? "..." : ""}
                      </p>
                    </span>
                    <span className="flex items-center space-x-[80px]">
                      <p> (x {item.count})</p>
                      <p className="text-[#46A358] font-bold text-[18px] leading-[16px] pr-[12px]">
                        ${(item.cost * item.count).toFixed(2)}
                      </p>
                    </span>
                  </div>
                </div>
              ))}
              <div className="">
                <span className="flex items-center justify-between pt-[20px]">
                  <p className="ml-[160px] font-normal text-[15px] leading-[16px] text-[#3D3D3D]">
                    Shiping
                  </p>
                  <p className="ml-[160px] font-medium txt-[18px] leading-[16px] text-[#3D3D3D]">
                    ${shippingCost.toFixed(2)}
                  </p>
                </span>
                <span className="flex items-center justify-between pt-[20px]">
                  <p className="ml-[160px] font-bold text-[16px] leading-[16px] text-[#3D3D3D]">
                    Total
                  </p>
                  <p className="ml-[160px] font-bold text-[18px] leading-[16px] text-[#46A358]">
                    ${finalTotal}
                  </p>
                </span>
                <div className="border-b border-[#46A35880] pb-[21px]"></div>
                <p className="pt-[18px] text-center font-normal text-[14px] leading-[22px] text-[#727272]">
                  Your order is currently being processed. You will receive an
                  order confirmation email shortly with the expected delivery
                  date for your items.
                </p>
                <div className="flex items-center justify-center mt-[49px] mb-[48px]">
                  <Button
                    bgBtn={false}
                    title="Track your order"
                    buttonWidth={162}
                    onClick={handleTrackOrder}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-[10px] bg-[#46A358]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderModal;
