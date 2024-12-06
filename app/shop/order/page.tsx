"use client";

import React, { useContext } from "react";
import { Context } from "@/context/context";
import { DeleteIcon } from "@/assets/icon";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "@/components/Button";
import Interested from "../page";
import Link from "next/link";

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

const Order: React.FC = () => {
  const { basketList, setBasketList } = useContext(Context);

  const increaseQuantity = (productId: string) => {
    setBasketList((prev: any) =>
      prev.map((item: any) =>
        item.product_id === productId
          ? { ...item, count: item.count + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setBasketList((prev: any) =>
      prev.map((item: any) =>
        item.product_id === productId && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setBasketList((prev: any) =>
      prev.filter((item: BasketListType) => item.product_id !== productId)
    );
  };

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

  return (
    <>
      <div className="container flex flex-col lg:flex-row justify-between pt-12">
        <div className="w-full lg:max-w-2xl">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 border-b border-[#46A35880] text-left">
                  Products
                </th>
                <th className="py-2 border-b border-[#46A35880] text-left">
                  Price
                </th>
                <th className="py-2 border-b border-[#46A35880] text-left">
                  Quantity
                </th>
                <th className="py-2 border-b border-[#46A35880] text-left">
                  Total
                </th>
                <th className="py-2 border-b border-[#46A35880] text-left"></th>
              </tr>
            </thead>
            <tbody>
              {basketList.map((item: BasketListType) => (
                <tr className="relative mt-2cc" key={item.product_id}>
                  <td className="py-4 flex items-center">
                    <img
                      src={item.image_url[0]}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div className="max-w-xs">
                      <p className="font-semibold">{item.product_name}</p>
                      <p className="text-gray-600 text-sm">
                        SKU: {item.product_id.slice(0, 10)}
                        {item.product_id.length > 10 ? "..." : ""}
                      </p>
                    </div>
                  </td>
                  <td className="py-4">${item.cost.toFixed(2)}</td>
                  <td className="py-4 flex items-center absolute top-[20px]">
                    <button
                      className="w-[23px] h-[28px] flex items-center justify-center rounded-[29px] bg-[#46A358]"
                      onClick={() => decreaseQuantity(item.product_id)}
                    >
                      <MinusOutlined className="text-white" />
                    </button>
                    <span className="mx-2">{item.count}</span>
                    <button
                      className="w-[23px] h-[28px] flex items-center justify-center rounded-[29px] bg-[#46A358]"
                      onClick={() => increaseQuantity(item.product_id)}
                    >
                      <PlusOutlined className="text-white" />
                    </button>
                  </td>
                  <td className="py-4 text-green-500 font-bold">
                    ${(item.cost * item.count).toFixed(2)}
                  </td>
                  <td className="py-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.product_id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full lg:max-w-xs relative mt-8 lg:mt-0">
          <h2 className="absolute w-full top-0 border-b border-[#46A35880] pb-3 font-bold text-lg text-[#3D3D3D]">
            Cart Totals
          </h2>
          <div className="mt-10">
            <p className="font-medium text-sm text-[#3D3D3D] pt-3">
              Coupon Apply
            </p>
            <div className="flex mt-2 font-normal text-sm text-[#3D3D3D]">
              <input
                placeholder="Enter coupon code here..."
                type="text"
                className="border border-[#46A358] rounded-l-md px-4 py-3 w-full outline-none"
              />
              <button className="bg-[#46A358] text-white px-6 rounded-r-md font-bold text-sm">
                Apply
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-between pt-7">
              <p className="font-normal text-sm">Subtotal</p>
              <p className="font-medium text-lg text-[#3D3D3D]">${totalCost}</p>
            </div>
            <div className="flex justify-between pt-4">
              <p className="text-sm">Coupon Discount</p>
              <p className="text-sm">(-) 00.00</p>
            </div>
            <div className="flex justify-between pt-5">
              <p className="text-sm">Shipping</p>
              <p className="font-medium text-lg text-[#3D3D3D]">
                ${shippingCost}
              </p>
            </div>
            <p className="text-xs text-[#46A358] font-normal text-right pt-2">
              View shipping charge
            </p>
          </div>
          <div className="pt-[26px]">
            <div className="flex justify-between mb-4">
              <p className="font-bold text-base text-[#3D3D3D]">Total</p>
              <p className="font-bold text-lg text-[#46A358]">${finalTotal}</p>
            </div>
            <Link className="mt-7" href={"/shop/checkout"}>
              <Button
                bgBtn={false}
                title="Proceed To Checkout"
                buttonWidth={332}
              />
            </Link>
            <div className="flex justify-center pt-4">
              <Link className="text-[#46A358] text-sm font-normal" href={"#"}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Interested />
    </>
  );
};

export default Order;
