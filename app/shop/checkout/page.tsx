"use client";

import React, { useState, useContext } from "react";
import { NextPage } from "next";
import { Button } from "@/components/Button";
import { Context } from "@/context/context";
import { CustomImage } from "@/components/CustomImage";
import ReactFlagsSelect from "react-flags-select";
import OrderModal from "@/components/OrderModal";

interface ContinentsType {
  id: number;
  title: string;
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

const Checkout: NextPage = () => {
  const { basketList } = useContext(Context);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    streetAddress: "",
    apartment: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
    differentAddress: false,
    orderNotes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
      | HTMLFormElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement & {
      name: string;
      value: string;
      type: string;
      checked?: boolean;
    };

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setFormData((prevData) => ({
      ...prevData,
      country: countryCode,
    }));
  };

  const calculateTotalCost = () => {
    let subtotal = 0;
    basketList.forEach((item: BasketListType) => {
      subtotal += item.cost * item.count;
    });
    return subtotal.toFixed(2);
  };

  const continents = [
    { id: 1, title: "Africa" },
    { id: 2, title: "Antarctica" },
    { id: 3, title: "Asia" },
    { id: 4, title: "Europe" },
    { id: 5, title: "North America" },
    { id: 6, title: "Oceania" },
    { id: 7, title: "South America" },
  ];

  const totalCost = parseFloat(calculateTotalCost());
  const shippingCost = 16.0;
  const finalTotal = (totalCost + shippingCost).toFixed(2);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between">
        <div className="w-full lg:max-w-[722px] px-4 mb-8 lg:mb-0">
          <h2 className="font-bold text-[17px] leading-[16px] text-[#3D3D3D] pb-[21px]">
            Billing Address
          </h2>
          <form>
            <div className="flex flex-wrap -mx-4 mb-4">
              <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                <label className="block mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-4">
                <label className="block mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-4 mb-4">
              <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                <label className="block mb-2">Country / Region *</label>
                <select className="border w-full px-4 py-2 rounded">
                  {continents.map((continent: ContinentsType) => (
                    <option key={continent.id} value={continent.title}>
                      {continent.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/2 px-4">
                <label className="block mb-2">Town / City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-4 mb-4">
              <div className="w-full px-4 mb-4">
                <label className="block mb-2">Street Address *</label>
                <div className="flex items-center justify-between">
                  <div className="w-full md:w-1/2 pr-4">
                    <input
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      placeholder="House number and street name"
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-4">
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-4 mb-4">
              <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                <label className="block mb-2">State *</label>
                <ReactFlagsSelect
                  selected={selectedCountry}
                  onSelect={handleCountrySelect}
                  searchable
                  searchPlaceholder="Search countries"
                />
              </div>
              <div className="w-full md:w-1/2 px-4">
                <label className="block mb-2">Zip *</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-4 mb-4">
              <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
                <label className="block mb-2">Email address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-4">
                <label className="block mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                name="differentAddress"
                checked={formData.differentAddress}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="font-medium text-[15px] leading-[16px]">
                Ship to a different address?
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Order notes (optional)</label>
              <textarea
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </form>
        </div>
        <div className="w-full lg:max-w-[405px] px-4">
          <h2 className="font-bold text-[17px] leading-[16px] text-[#3D3D3D] pb-[21px]">
            Your Order
          </h2>
          <div className="flex items-center justify-between border-b border-[#46A35880] pb-[11px]">
            <p className="font-medium text-[16px] leading-[16px] text-[#3D3D3D]">
              Products
            </p>
            <p className="font-medium text-[16px] leading-[16px] text-[#3D3D3D]">
              Subtotal
            </p>
          </div>
          <div>
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
                      {item.product_name} (x {item.count})
                    </p>
                    <p className="text-[14px] leading-[16px] text-[#727272] pt-[6px]">
                      SKU: {item.product_id.slice(0, 10)}
                      {item.product_id.length > 10 ? "..." : ""}
                    </p>
                  </span>
                  <p className="text-[#46A358] font-bold text-[18px] leading-[16px] pr-[12px]">
                    ${(item.cost * item.count).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div>
              <div className="flex items-center justify-end space-x-1 pt-[17px]">
                <span className="font-normal text-[14px] leading-[16px]">
                  Have a coupon code?
                </span>
                <p className="font-medium text-[14px] leading-[16px] text-[#46A358]">
                  Click here
                </p>
              </div>
              <div className="flex justify-between pb-[15px] pt-[19px]">
                <p className="font-normal text-[15px] leading-[16px] text-[#3D3D3D]">
                  Subtotal
                </p>
                <p className="font-medium text-[18px] leading-[16px] text-[#3D3D3D]">
                  ${totalCost}
                </p>
              </div>
              <div className="flex justify-between pb-[15px]">
                <p className="font-normal text-[15px] leading-[16px] text-[#3D3D3D]">
                  Coupon Discount
                </p>
                <p className="font-normal text-[15px] leading-[16px] text-[#3D3D3D]">
                  (-) 00.00
                </p>
              </div>
              <div className="flex justify-between pb-[15px]">
                <p className="font-normal text-[15px] leading-[16px] text-[#3D3D3D]">
                  Shipping
                </p>
                <p className="font-medium text-[18px] leading-[16px] text-[#3D3D3D]">
                  ${shippingCost.toFixed(2)}
                </p>
              </div>
              <p className="text-xs text-green-500 text-right">
                View shipping charge
              </p>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 border-t border-[#46A35880] pt-[16px]">
              <p className="font-bold text-[16px] leading-[16px] text-[#3D3D3D]">
                Total
              </p>
              <p className="font-bold text-[18px] leading-[16px] text-[#46A358]">
                ${finalTotal}
              </p>
            </div>
          </div>
          <div className="mt-[47px]">
            <h2 className="font-bold text-[17px] leading-[16px] text-[#3D3D3D]">
              Payment Method
            </h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center border border-[#EAEAEA] px-[11px] py-[12px] mt-[19px]">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="paypal"
                  className="mr-2"
                />
                <span className="flex items-center space-x-2">
                  <CustomImage
                    src="/PayPal.png"
                    width={50}
                    height={20}
                    alt="PayPal Logo"
                    priority={true}
                  />
                  <CustomImage
                    src="/masterCard.png"
                    width={50}
                    height={20}
                    alt="PayPal Logo"
                    priority={true}
                  />
                  <CustomImage
                    src="/visa.png"
                    width={50}
                    height={20}
                    alt="PayPal Logo"
                    priority={true}
                  />
                  <CustomImage
                    src="/american.svg"
                    width={50}
                    height={20}
                    alt="PayPal Logo"
                    priority={true}
                  />
                </span>
              </div>
              <div className="flex items-center border border-[#EAEAEA] px-[11px] py-[12px] mt-[15px]">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="bank"
                  className="mr-2"
                />
                <label htmlFor="bank">Direct bank transfer</label>
              </div>
              <div className="flex items-center border border-[#EAEAEA] px-[11px] py-[12px] mt-[15px]">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="cod"
                  className="mr-2"
                />
                <label htmlFor="cod">Cash on delivery</label>
              </div>
            </div>
            <div className="mt-[49px]">
              <Button
                bgBtn={false}
                title="Place Order"
                buttonWidth={380}
                onClick={openModal}
              />
            </div>
          </div>
        </div>
      </div>
      <OrderModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Checkout;
