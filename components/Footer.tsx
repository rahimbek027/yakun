import Image from "next/image";
import React from "react";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="container bg-white">
      <div className=" mt-[100px] bg-[#FBFBFB]">
        <div className="p-6 flex flex-wrap items-center gap-8 md:flex-nowrap ">
          <div className="w-full md:w-auto text-center md:text-left border-b md:border-b-0 md:border-r border-[#46a3594e] pb-4 md:pb-0 md:pr-6">
            <Image
              className="mx-auto md:mx-0"
              src="/garden.svg"
              alt="icon"
              width={64}
              height={64}
            />
            <h4 className="font-bold text-lg mt-4">Garden Care</h4>
            <p className="text-sm text-gray-600 mt-2 md:w-56">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>
          <div className="w-full md:w-auto text-center md:text-left border-b md:border-b-0 md:border-r border-[#46a3594e] pb-4 md:pb-0 md:pr-6">
            <Image
              className="mx-auto md:mx-0"
              src="/plant.svg"
              alt="icon"
              width={64}
              height={64}
            />
            <h4 className="font-bold text-lg mt-4">Plant Renovation</h4>
            <p className="text-sm text-gray-600 mt-2 md:w-56">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>
          <div className="w-full md:w-auto text-center md:text-left md:pr-6">
            <Image
              className="mx-auto md:mx-0"
              src="/watering.svg"
              alt="icon"
              width={64}
              height={64}
            />
            <h4 className="font-bold text-lg mt-4">Watering Garden</h4>
            <p className="text-sm text-gray-600 mt-2 md:w-52">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>
          <div className="w-full md:w-auto text-center md:text-left">
            <h4 className="font-bold text-lg mt-4 md:whitespace-nowrap">
              Join Our Newsletter
            </h4>
            <div className="flex mt-4 shadow rounded-[6px]">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full p-2 rounded-l-[6px] outline-none"
              />
              <button className="bg-[#46A358] duration-200 cursor-pointer text-white p-2 rounded-r-[6px] w-[85px] hover:bg-[#52b666]">
                Join
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-[17px]">
              We usually post offers and challenges in newsletters. We’re your
              online houseplant destination. We offer a wide range of
              houseplants and accessories shipped directly from our (green)house
              to yours!
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 my-8"></div>
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-start space-y-4 md:space-y-0 md:space-x-[116px] bg-[#46A3581A] p-4">
        <Image
          src="/site-logo.svg"
          alt="greenshop logo"
          width={64}
          height={64}
          className="w-[150px] h-[34px]"
        />
        <p className="max-w-[176px] flex items-center text-sm text-gray-600 mb-2 md:mb-0">
          <EnvironmentOutlined className="mr-2 text-[#46A358]" />
          70 West Buckingham Ave., Farmingdale, NY 11735
        </p>
        <p className="flex items-center text-sm text-gray-600 mb-2 md:mb-0">
          <MailOutlined className="mr-2 text-[#46A358]" />
          contact@greenshop.com
        </p>
        <p className="flex items-center text-sm text-gray-600">
          <PhoneOutlined className="mr-2 text-[#46A358]" />
          +88 01911 717 490
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
        <div className="text-center md:text-left">
          <h4 className="font-bold text-lg">My Account</h4>
          <ul className="mt-4 space-y-2 hidden md:block">
            <li className="text-sm text-gray-600">My Account</li>
            <li className="text-sm text-gray-600">Our stores</li>
            <li className="text-sm text-gray-600">Contact us</li>
            <li className="text-sm text-gray-600">Career</li>
            <li className="text-sm text-gray-600">Specials</li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-bold text-lg">Help & Guide</h4>
          <ul className="mt-4 space-y-2 hidden md:block">
            <li className="text-sm text-gray-600">Help Center</li>
            <li className="text-sm text-gray-600">How to Buy</li>
            <li className="text-sm text-gray-600">Shipping & Delivery</li>
            <li className="text-sm text-gray-600">Product Policy</li>
            <li className="text-sm text-gray-600">How to Return</li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-bold text-lg">Categories</h4>
          <ul className="mt-4 space-y-2 hidden md:block">
            <li className="text-sm text-gray-600">House Plants</li>
            <li className="text-sm text-gray-600">Potter Plants</li>
            <li className="text-sm text-gray-600">Seeds</li>
            <li className="text-sm text-gray-600">Small Plants</li>
            <li className="text-sm text-gray-600">Accessories</li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="font-bold text-lg">Social Media</h4>
          <div className="flex mt-4 space-x-4 justify-center md:justify-start">
            <Image src="/facebok.svg" alt="facebook" width={32} height={32} />
            <Image src="/insta.svg" alt="instagram" width={32} height={32} />
            <Image src="/twitter.svg" alt="twitter" width={32} height={32} />
            <Image src="/ln.svg" alt="linkedin" width={32} height={32} />
            <Image src="/union.svg" alt="youtube" width={32} height={32} />
          </div>
          <h4 className="font-bold text-lg mt-6">We accept</h4>
          <div className="flex mt-4 space-x-4 justify-center md:justify-start">
            <Image src="/paypal.png" alt="paypal" width={50} height={32} />
            <Image
              src="/masterCard.png"
              alt="mastercard"
              width={50}
              height={32}
            />
            <Image src="/visa.png" alt="visa" width={50} height={32} />
            <Image
              src="/american.svg"
              alt="americanexpress"
              width={50}
              height={32}
            />
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-600 mt-8">
        © 2021 GreenShop. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
