// "use client";
// import HeroMobile from "@/components/HeroCarusel/HeroMobile";
// import HeroCarusel from "../components/HeroCarusel";
// import { RangeSlider } from "@/components/RangeSlider";
// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { URL } from "../service/request";
// import { Product } from "@/components/Product";
// import { Pagination } from "antd";
// import Image from "next/image";
// import SummerCom from "@/components/SummerCom";
// import BlogCom from "@/components/BlogCom";
// import NewsLettertCom from "@/components/NewsLettertCom";

// interface Categories {
//   category_id: string;
//   category_name: string;
// }

// interface PlantProductsType {
//   product_id: string;
//   product_name: string;
//   cost: string;
//   image: string;
// }

// interface SizeType {
//   size_id: number;
//   size_name: string;
// }

// interface TagNavbarType {
//   tag_id: number;
//   tag_name: string;
// }

// interface ProductType {
//   basket: boolean;
//   category_id: string;
//   cost: number;
//   count: number;
//   discount: number;
//   image_url: string;
//   liked: boolean;
//   product_description: string;
//   product_id: string;
//   product_name: string;
//   product_status: string;
//   short_description: string;
//   size: [];
//   tags: [];
// }
// function Home() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [refresh, setRefresh] = useState<boolean>(false);
//   const [pages, setPaes] = useState<number>(1);
//   const [limited, setLimited] = useState<number>(10);
//   const [arrow, setArrow] = useState<string>("Show");
//   const [category, setCategory] = useState<Array<Categories>>([]);
//   const [categoriesId, setCategoriesId] = useState<string | null>(null);
//   const [tagNavbarId, setTagNavbarId] = useState<string>("");
//   const [sizeId, setSizeId] = useState<string | null>(null);
//   const [plantProducts, setPlantProduct] = useState<Array<any>>([]);
//   const mergedArrow = useMemo(() => {
//     if (arrow === "Hide") {
//       return false;
//     }
//     if (arrow === "Show") {
//       return true;
//     } else {
//       pointAtCenter: true;
//     }
//   }, [arrow]);

//   const size: SizeType[] = [
//     {
//       size_id: 1,
//       size_name: "Small",
//     },
//     {
//       size_id: 2,
//       size_name: "Medium",
//     },
//     {
//       size_id: 3,
//       size_name: "Large",
//     },
//   ];
//   const tagNavbar: TagNavbarType[] = [
//     {
//       tag_id: 1,
//       tag_name: "All Plants",
//     },
//     {
//       tag_id: 2,
//       tag_name: "New Arrivals",
//     },
//     {
//       tag_id: 3,
//       tag_name: "Sale",
//     },
//   ];

//   useEffect(() => {
//     axios.get(`${URL}/categories?page=1&limit=100`).then((res) => {
//       setCategory(res.data.categories);
//     });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`${URL}/products`, {
//         params: {
//           page: 1,
//           limit: 10,
//           name: null,
//           category: categoriesId,
//           size: sizeId,
//           min_price: null,
//           max_price: null,
//         },
//       })
//       .then((res) => {
//         setIsLoading(false);
//         setLimited(res.data.total_count);
//         setPlantProduct(res.data.products);
//       })
//       .catch((error) => {
//         setIsLoading(false);
//       });
//   }, [categoriesId, tagNavbarId]);

//   return (
//     <>
//       <section className="pt-[12px] pb-[46px]">
//         <div className="container px-5 md:px-0">
//           <HeroCarusel />
//           <HeroMobile />
//         </div>
//       </section>
//       <section>
//         <div className="container">
//           <div className="flex flex-col md:flex-row justify-between gap-x-[50px] gap-y-[30px]">
//             <div className="w-full md:w-[310px] bg-[#FBFBFB]">
//               <div className="p-[15px]">
//                 <h2 className="font-bold text-[18px] leading-[16px]">
//                   Categories
//                 </h2>
//                 <ul className="pl-[12px] space-y-[15px] mt-[20px] mb-[36px]">
//                   {category &&
//                     Array.isArray(category) &&
//                     category?.length > 0 &&
//                     category?.map((item: Categories) => (
//                       <li
//                         key={item.category_id}
//                         onClick={() => {
//                           setIsLoading(true);
//                           setTimeout(() => {
//                             setCategoriesId(item.category_name);
//                           }, 500);
//                         }}
//                         className={`flex items-center justify-between cursor-pointer ${
//                           categoriesId == item.category_name
//                             ? "text-[#46A358] font-bold"
//                             : ""
//                         }`}
//                       >
//                         <span>{item.category_name}</span>
//                       </li>
//                     ))}
//                 </ul>
//                 <h2 className="font-bold text-[18px] leading-[16px]">
//                   Price Range
//                 </h2>
//                 <RangeSlider />
//                 <h2 className="font-bold text-[18px] leading-[16px] mt-[46px]">
//                   Size
//                 </h2>
//                 <ul className="pl-[12px] space-y-[15px] mt-[20px] mb-[36px]">
//                   {size.map((item: SizeType) => (
//                     <li
//                       onClick={() => setSizeId(item.size_name)}
//                       className={`flex items-center justify-between cursor-pointer ${
//                         sizeId == item.size_name
//                           ? "text-[#46A358] font-bold"
//                           : ""
//                       }`}
//                       key={item.size_id}
//                     >
//                       <span>{item.size_name}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <Link href={"#"}>
//                 <Image
//                   src="/Super-Sale.png"
//                   alt="Plant"
//                   width={310}
//                   height={470}
//                   priority={true}
//                   className="mx-auto"
//                 />
//               </Link>
//             </div>
//             <div className="w-full md:w-[840px]">
//               <div className="flex flex-col md:flex-row items-center justify-between">
//                 <ul className="flex items-center space-x-[37px] mb-[20px] md:mb-0">
//                   {tagNavbar.map((item: TagNavbarType) => (
//                     <li
//                       className={` cursor-pointer ${
//                         tagNavbarId == item.tag_name
//                           ? "text-[#46A358] font-semibold border-b-[3.5px] pb-[7px] border-[#46A358]"
//                           : ""
//                       }`}
//                       onClick={() => setTagNavbarId(item.tag_name)}
//                       key={item.tag_id}
//                     >
//                       {item.tag_name}
//                     </li>
//                   ))}
//                 </ul>
//                 <div>
//                   <h2 className="text-sm md:text-base">
//                     Short by:Default sorting
//                   </h2>
//                 </div>
//               </div>
//               <ul className="mt-[31px] flex flex-wrap gap-[30px] text-center md:text-left justify-center md:justify-start">
//                 {isLoading
//                   ? "Loading..."
//                   : plantProducts.length
//                   ? plantProducts.map((item: any) => (
//                       <Product
//                         key={item.product_id}
//                         id={item.product_id}
//                         images={item.image}
//                         price={item.cost}
//                         title={item.product_name}
//                       />
//                     ))
//                   : "Empty Product..."}
//               </ul>
//               <div className="mt-[90px] flex justify-center md:justify-end">
//                 <Pagination defaultCurrent={pages} total={limited} />
//               </div>
//             </div>
//           </div>
//           <SummerCom />
//           <BlogCom />
//           <NewsLettertCom />
//         </div>
//       </section>
//     </>
//   );
// }
// export default Home;

// blogComponent

// import { ArrowRightOutlined } from "@ant-design/icons";
// import Image from "next/image";
// import React from "react";

// const BlogCom = () => {
//   return (
//     <div className="mt-[138px]">
//       <h2 className="text-center font-bold text-[30px] leading-[16px] text-[#3D3D3D] pb-[15px]">
//         Our Blog Posts
//       </h2>
//       <p className="text-center font-normal text-[16px] leading-[24px] text-[#727272] pb-[35px]">
//         We are an online plant shop offering a wide range of cheap and trendy
//         plants.{" "}
//       </p>
//       <div className="flex items-center justify-center gap-x-[44px]">
//         <div className="w-[268px]">
//           <Image
//             src={"/blogCom-img1.jpg"}
//             alt="image"
//             width={268}
//             height={195}
//             priority={true}
//           />
//           <span className="block pt-[9px] pe-[11px] pb-[12px] ps-[15px]">
//             {" "}
//             <p className="text-[#46A358] font-medium text-[14px] leading-[16px] pb-[4px]">
//               September 12 I Read in 6 minutes
//             </p>
//             <h4 className="font-bold text-[20px] leading-[26px] text-[#3D3D3D] pb-[4px]">
//               Cactus & Succulent Care Tips
//             </h4>
//             <p className="font-normal text-[14px] leading-[22px] text-[#727272] pb-[9px]">
//               Cacti are succulents are easy plants for any home or patio.
//             </p>
//             <button className="duration-200 cursor-pointer hover:text-[#46A358]">
//               Read More <ArrowRightOutlined className="pl-[6px]" />
//             </button>
//           </span>
//         </div>
//         <div className="w-[268px]">
//           <Image
//             src={"/blogCom-img1.jpg"}
//             alt="image"
//             width={268}
//             height={195}
//             priority={true}
//           />
//           <span className="block pt-[9px] pe-[11px] pb-[12px] ps-[15px]">
//             {" "}
//             <p className="text-[#46A358] font-medium text-[14px] leading-[16px] pb-[4px]">
//               September 12 I Read in 6 minutes
//             </p>
//             <h4 className="font-bold text-[20px] leading-[26px] text-[#3D3D3D] pb-[4px]">
//               Cactus & Succulent Care Tips
//             </h4>
//             <p className="font-normal text-[14px] leading-[22px] text-[#727272] pb-[9px]">
//               Cacti are succulents are easy plants for any home or patio.
//             </p>
//             <button className="duration-200 cursor-pointer hover:text-[#46A358]">
//               Read More <ArrowRightOutlined className="pl-[6px]" />
//             </button>
//           </span>
//         </div>
//         <div className="w-[268px]">
//           <Image
//             src={"/blogCom-img1.jpg"}
//             alt="image"
//             width={268}
//             height={195}
//             priority={true}
//           />
//           <span className="block pt-[9px] pe-[11px] pb-[12px] ps-[15px]">
//             {" "}
//             <p className="text-[#46A358] font-medium text-[14px] leading-[16px] pb-[4px]">
//               September 12 I Read in 6 minutes
//             </p>
//             <h4 className="font-bold text-[20px] leading-[26px] text-[#3D3D3D] pb-[4px]">
//               Cactus & Succulent Care Tips
//             </h4>
//             <p className="font-normal text-[14px] leading-[22px] text-[#727272] pb-[9px]">
//               Cacti are succulents are easy plants for any home or patio.
//             </p>
//             <button className="duration-200 cursor-pointer hover:text-[#46A358]">
//               Read More <ArrowRightOutlined className="pl-[6px]" />
//             </button>
//           </span>
//         </div>
//         <div className="w-[268px]">
//           <Image
//             src={"/blogCom-img1.jpg"}
//             alt="image"
//             width={268}
//             height={195}
//             priority={true}
//           />
//           <span className="block pt-[9px] pe-[11px] pb-[12px] ps-[15px]">
//             {" "}
//             <p className="text-[#46A358] font-medium text-[14px] leading-[16px] pb-[4px]">
//               September 12 I Read in 6 minutes
//             </p>
//             <h4 className="font-bold text-[20px] leading-[26px] text-[#3D3D3D] pb-[4px]">
//               Cactus & Succulent Care Tips
//             </h4>
//             <p className="font-normal text-[14px] leading-[22px] text-[#727272] pb-[9px]">
//               Cacti are succulents are easy plants for any home or patio.
//             </p>
//             <button className="duration-200 cursor-pointer hover:text-[#46A358]">
//               Read More <ArrowRightOutlined className="pl-[6px]" />
//             </button>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogCom;

// RangeSlider

// "use client";
// import React, { useState } from "react";
// import { Slider } from "antd";
// import { Button } from "./Button";

// interface RangeType {
//   setRangeValue: (value: number[]) => void;
// }
// export const RangeSlider = ({ setRangeValue }) => {
//   const [values, setValues] = useState<number[]>([99, 800]);
//   const onChangeComplete = (value: number[]) => {
//     setValues(value);
//     setRangeValue(value);
//   };
//   return (
//     <div>
//       <Slider
//         range
//         step={1}
//         defaultValue={values}
//         min={39}
//         max={1500}
//         onChangeComplete={onChangeComplete}
//       />
//       <p>
//         <span className="text-[15px] leading-[16px]"> Price:</span>
//         <span className="font-semibold text-[#46A358] ml-2">
//           {" "}
//           {Array.isArray(values) ? values[0] : values}$ -
//         </span>
//         <span className="font-semibold text-[#46A358]">
//           {Array.isArray(values) ? values[values.length - 1] : values}$
//         </span>
//       </p>
//       <br />
//       <Button bgBtn={false} title="Filter" buttonWidth={90} />
//     </div>
//   );
// };

// fetch page

// "use client";
// import HeroMobile from "@/components/HeroCarusel/HeroMobile";
// import HeroCarusel from "../components/HeroCarusel";
// import { RangeSlider } from "@/components/RangeSlider";
// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import { URL } from "../service/request";
// import { Product } from "@/components/Product";
// import { Pagination } from "antd";
// import Image from "next/image";
// import SummerCom from "@/components/SummerCom";
// import BlogCom from "@/components/BlogCom";

// interface Categories {
//   category_id: string;
//   category_name: string;
// }

// interface PlantProductsType {
//   product_id: string;
//   product_name: string;
//   cost: string;
//   image: string;
// }

// interface SizeType {
//   size_id: number;
//   size_name: string;
// }

// interface TagNavbarType {
//   tag_id: number;
//   tag_name: string;
// }

// interface ProductType {
//   basket: boolean;
//   category_id: string;
//   cost: number;
//   count: number;
//   discount: number;
//   image_url: string;
//   liked: boolean;
//   product_description: string;
//   product_id: string;
//   product_name: string;
//   product_status: string;
//   short_description: string;
//   size: [];
//   tags: [];
// }

// function Home() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [refresh, setRefresh] = useState<boolean>(false);
//   const [pages, setPages] = useState<number>(1);
//   const [limited, setLimited] = useState<number>(10);
//   const [arrow, setArrow] = useState<string>("Show");
//   const [category, setCategory] = useState<Array<Categories>>([]);
//   const [categoriesId, setCategoriesId] = useState<string | null>(null);
//   const [tagNavbarId, setTagNavbarId] = useState<string>("");
//   const [sizeId, setSizeId] = useState<string | null>(null);
//   const [priceRange, setPriceRange] = useState<number[]>([39, 1500]);
//   const [plantProducts, setPlantProduct] = useState<Array<ProductType>>([]);

//   const mergedArrow = useMemo(() => {
//     if (arrow === "Hide") {
//       return false;
//     }
//     if (arrow === "Show") {
//       return true;
//     } else {
//       pointAtCenter: true;
//     }
//   }, [arrow]);

//   const size: SizeType[] = [
//     {
//       size_id: 1,
//       size_name: "Small",
//     },
//     {
//       size_id: 2,
//       size_name: "Medium",
//     },
//     {
//       size_id: 3,
//       size_name: "Large",
//     },
//   ];

//   const tagNavbar: TagNavbarType[] = [
//     {
//       tag_id: 1,
//       tag_name: "All Plants",
//     },
//     {
//       tag_id: 2,
//       tag_name: "New Arrivals",
//     },
//     {
//       tag_id: 3,
//       tag_name: "Sale",
//     },
//   ];

//   useEffect(() => {
//     fetch(`${URL}/categories?page=1&limit=100`)
//       .then((res) => res.json())
//       .then((data) => {
//         setCategory(data.categories);
//       })
//       .catch((error) => {
//         console.error("Error fetching categories:", error);
//       });
//   }, []);

//   useEffect(() => {
//     setIsLoading(true);
//     fetch(
//       `${URL}/products?page=1&limit=10&category=${categoriesId || ""}&size=${
//         sizeId || ""
//       }&min_price=${priceRange ? priceRange[0] : 0}&max_price=${
//         priceRange ? priceRange[1] : 0
//       }`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setIsLoading(false);
//         setLimited(data.total_count);
//         setPlantProduct(data.products);
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         console.error("Error fetching products:", error);
//       });
//   }, [categoriesId, sizeId, priceRange]);

//   return (
//     <>
//       <section className="pt-[12px] pb-[46px]">
//         <div className="container px-5 md:px-0">
//           <HeroCarusel />
//           <HeroMobile />
//         </div>
//       </section>
//       <section>
//         <div className="container">
//           <div className="flex flex-col md:flex-row justify-between gap-x-[50px] gap-y-[30px]">
//             <div className="w-full md:w-[310px] bg-[#FBFBFB]">
//               <div className="p-[15px]">
//                 <h2 className="font-bold text-[18px] leading-[16px]">
//                   Categories
//                 </h2>
//                 <ul className="pl-[12px] space-y-[15px] mt-[20px] mb-[36px]">
//                   {category &&
//                     Array.isArray(category) &&
//                     category?.length > 0 &&
//                     category?.map((item: Categories) => (
//                       <li
//                         key={item.category_id}
//                         onClick={() => {
//                           setIsLoading(true);
//                           setTimeout(() => {
//                             setCategoriesId(item.category_name);
//                           }, 500);
//                         }}
//                         className={`flex items-center justify-between cursor-pointer ${
//                           categoriesId == item.category_name
//                             ? "text-[#46A358] font-bold"
//                             : ""
//                         }`}
//                       >
//                         <span>{item.category_name}</span>
//                       </li>
//                     ))}
//                 </ul>
//                 <h2 className="font-bold text-[18px] leading-[16px]">
//                   Price Range
//                 </h2>
//                 <RangeSlider setRangeValue={setPriceRange} />
//                 <h2 className="font-bold text-[18px] leading-[16px] mt-[46px]">
//                   Size
//                 </h2>
//                 <ul className="pl-[12px] space-y-[15px] mt-[20px] mb-[36px]">
//                   {size?.map((item: SizeType) => (
//                     <li
//                       onClick={() => setSizeId(item.size_name)}
//                       className={`flex items-center justify-between cursor-pointer ${
//                         sizeId == item.size_name
//                           ? "text-[#46A358] font-bold"
//                           : ""
//                       }`}
//                       key={item.size_id}
//                     >
//                       <span>{item.size_name}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <Link href={"#"}>
//                 <Image
//                   src="/Super-Sale2.png"
//                   alt="Plant"
//                   width={310}
//                   height={470}
//                   priority={true}
//                   className="mx-auto hidden md:block"
//                 />
//               </Link>
//             </div>
//             <div className="w-full md:w-[840px]">
//               <div className="flex flex-col md:flex-row items-center justify-between">
//                 <ul className="flex items-center space-x-[37px] mb-[20px] md:mb-0">
//                   {tagNavbar.map((item: TagNavbarType) => (
//                     <li
//                       className={`cursor-pointer ${
//                         tagNavbarId == item.tag_name
//                           ? "text-[#46A358] font-semibold border-b-[3.5px] pb-[7px] border-[#46A358]"
//                           : ""
//                       }`}
//                       onClick={() => setTagNavbarId(item.tag_name)}
//                       key={item.tag_id}
//                     >
//                       {item.tag_name}
//                     </li>
//                   ))}
//                 </ul>
//                 <div>
//                   Short by: Default sorting
//                   <select>
//                     <option>Title Sort</option>
//                     <option> Price Sort</option>
//                   </select>
//                 </div>
//               </div>
//               <ul className="mt-[31px] flex flex-wrap gap-[30px] text-center md:text-left justify-center md:justify-start">
//                 {isLoading
//                   ? "Loading..."
//                   : plantProducts?.length
//                   ? plantProducts.map((item: ProductType) => (
//                       <Product
//                         setRefresh={setRefresh}
//                         refresh={refresh}
//                         key={item.product_id}
//                         item={item}
//                       />
//                     ))
//                   : "Empty Product..."}
//               </ul>
//               <div className="mt-[90px] flex justify-center md:justify-end">
//                 <Pagination defaultCurrent={pages} total={limited} />
//               </div>
//             </div>
//           </div>
//           <SummerCom />
//           <BlogCom />
//         </div>
//       </section>
//     </>
//   );
// }

// export default Home;

// header

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import React, { ChangeEventHandler, useState } from "react";
// import { Navbar } from "./Navbar";
// import {
//   SearchIcon,
//   OrderBasket,
//   LoginIcon,
//   HamburgerButtonIcon,
// } from "@/assets/icon";
// import { Button } from "./Button";
// import { usePathname } from "next/navigation";

// interface LinkType {
//   id: number;
//   title: string;
//   path: string;
//   isActive: boolean;
// }
// const Header = () => {
//   const pathname = usePathname();
//   const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
//   const [openModal, setOpenModal] = useState<boolean>(false);
//   const [loginModal, setLoginModal] = useState<boolean>(false);

//   const navList = [
//     {
//       id: 1,
//       title: "Home",
//       path: "/",
//       isActive: pathname == "/" ? true : false,
//     },
//     {
//       id: 2,
//       title: "Shop",
//       path: "/shop",
//       isActive: pathname == "/shop" ? true : false,
//     },
//     {
//       id: 3,
//       title: "Plant Care",
//       path: "/plant",
//       isActive: pathname == "/plant" ? true : false,
//     },
//     {
//       id: 4,
//       title: "Blogs",
//       path: "/blogs",
//       isActive: pathname == "/blogs" ? true : false,
//     },
//   ];
//   const handleSearchChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
//     if (e.target.value == "") {
//       setTimeout(() => {
//         setShowSearchInput(false);
//       }, 2000);
//     }
//   };

//   const closeModal = (e: React.MouseEvent) => {
//     if ((e.target as HTMLButtonElement).id == "modal-wrapper")
//       setOpenModal(false);
//   };

//   const loginModalOPen = () => {};

//   return (
//     <header className="pt-[42px] md:pt-[25px]">
//       <div className="container md:border-b-[1px] gap-[8px] md:gap-0 border-[#A2D0AB] px-[24px] md:px-0 flex items-center justify-between">
//         <Link className="hidden md:block pb-[17px]" href={"/"}>
//           <Image
//             src={"/site-logo.svg"}
//             width={150}
//             height={34}
//             alt="site-logo"
//             priority={true}
//           />
//         </Link>
//         <Navbar />
//         <div className="hidden md:flex items-center space-x-[30px] pb-[11px]">
//           <button
//             className="flex items-center"
//             onClick={() => setShowSearchInput(true)}
//           >
//             {!showSearchInput && <SearchIcon />}
//             <input
//               onChange={handleSearchChangeInput}
//               className={`${
//                 showSearchInput ? "py-[14px] pl-[41px] w-[300px]" : "w-[0px]"
//               } search-input duration-300 outline-none focus:shadow text-[14px] font-normal leading-[16px] bg-[#F8F8F8] rounded-[10px] `}
//               type="text"
//               placeholder="Find your plants"
//               autoComplete="off"
//               aria-label="Find your plants"
//               name="plants-search"
//             />
//           </button>
//           <button>
//             <OrderBasket />
//           </button>
//           <Button
//             onClick={() => setLoginModal(true)}
//             bgBtn={false}
//             title="Login"
//             iconPosition="prev"
//             icon={<LoginIcon />}
//             buttonWidth={100}
//           />
//         </div>
//         <input
//           className="block md:hidden  py-[14px] pl-[41px] w-[90%]
//          search-input duration-300 outline-none focus:shadow text-[14px] font-normal leading-[16px] bg-[#F8F8F8] rounded-[10px]"
//           type="text"
//           placeholder="Find your plants"
//           autoComplete="off"
//           aria-label="Find your plants"
//           name="plants-search"
//         />
//         <button
//           onClick={() => setOpenModal(true)}
//           className="md:hidden w-[45px] h-[45px] bg-[#46A258] rounded-[14px] shadow flex items-center justify-center opacity-90"
//         >
//           <HamburgerButtonIcon />
//         </button>
//       </div>
//       <div
//         onClick={closeModal}
//         id="modal-wrapper"
//         className={` ${
//           openModal ? "left-0" : "left-[-100%]"
//         } modal duration-500 fixed top-0 z-[2] backdrop-blur-md  h-[100vh] w-full `}
//       >
//         <div
//           className={`absolute w-[80%] h-[100vh] bg-[#46A258] opacity-90 duration-500  ${
//             openModal ? "right-0" : "right-[-200%]"
//           } p-10 flex flex-col space-y-5`}
//         >
//           {navList.map((item: LinkType) => (
//             <Link
//               onClick={() => setOpenModal(false)}
//               className={`font-normal
//             pb-[31px] text-[16px] leading-[20px] text-white`}
//               key={item.id}
//               href={item.path}
//             >
//               {item.title}
//             </Link>
//           ))}
//         </div>
//       </div>
//       <div onClick={loginModalOPen}>
//         <form>
//           <input type="text" />
//           <input type="text" />
//           <button> </button>
//         </form>
//       </div>
//     </header>
//   );
// };

// export default Header;

// login va register

// "use client";

// import React, { FC, useState, ChangeEvent } from "react";
// import Image from "next/image";
// import { CloseOutlined } from "@ant-design/icons";
// import { Button } from "./Button";
// import { Input } from "antd";
// import axios from "axios";
// import { URL } from "@/service/request";

// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
//   const [isModalContent, setIsModalContent] = useState<string>("Login");
//   const [loginEmail, setLoginEmail] = useState<string>("");
//   const [loginPassword, setLoginPassword] = useState<string>("");
//   const [registerEmail, setRegisterEmail] = useState<string>("");
//   const [registerFirstName, setRegisterFirstName] = useState<string>("");
//   const [registerLastName, setRegisterLastName] = useState<string>("");
//   const [registerPassword, setRegisterPassword] = useState<string>("");
//   const [registerConfirmPassword, setRegisterConfirmPassword] =
//     useState<string>("");
//   const [forgotLoginEmail, setForgotLoginEmail] = useState<string>("");
//   const [forgotEmailOTPCode, setForgotEmailOTPCode] = useState<string>("");
//   const [registerOTPCode, setRegisterOTPCode] = useState<string>("");

//   if (!isOpen) return null;

//   const handleLogin = () => {
//     const data = {
//       password: loginPassword,
//       usernameoremail: loginEmail,
//     };
//     try {
//       axios.post(`${URL}/login`, data).then((res) => {
//         window.localStorage.setItem("token", res.data.access_token);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     console.log(data);
//   };

//   const handleRegister = () => {
//     const data = {
//       email: registerEmail,
//       firstName: registerFirstName,
//       password: registerPassword,
//     };
//     try {
//       axios.post(`${URL}/register`, data).then((res) => {
//         setIsModalContent("registerVerify");
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const registerVerifyBtnClick = () => {
//     const data = {
//       email: registerEmail,
//       code: registerOTPCode,
//     };
//     try {
//       axios.post(`${URL}/users/verify`, data).then((res) => {
//         setIsModalContent("Login");
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const forgotBtnClick = () => {
//     axios
//       .post(
//         `${URL}/forgot`,
//         {},
//         {
//           params: {
//             email: forgotLoginEmail,
//           },
//         }
//       )
//       .then((res) => {
//         setIsModalContent("Login");
//       });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white p-8 rounded shadow-lg relative w-full max-w-[600px]">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <CloseOutlined />
//         </button>
//         <div className="text-center mb-4">
//           <ul className="flex items-center space-x-3 justify-center text-[22px] font-semibold">
//             <li
//               onClick={() => setIsModalContent("Login")}
//               className={`${
//                 isModalContent == "Login"
//                   ? "text-[#46A358] font-medium text-[20px] leading-[16px]"
//                   : ""
//               }`}
//             >
//               Login
//             </li>
//             <li className="w-[1px] h-[16px] bg-[#3D3D3D]"></li>
//             <li
//               onClick={() => setIsModalContent("Register")}
//               className={`${
//                 isModalContent == "Register"
//                   ? "text-[#46A358] font-medium text-[20px] leading-[16px]"
//                   : ""
//               }`}
//             >
//               Register
//             </li>
//           </ul>
//         </div>

//         {isModalContent == "Login" && (
//           <form className="px-[100px] pt-[50px] pb-[68px]">
//             <div className="mb-4">
//               <label
//                 className="block font-normal text-[13px] leading-[16px] text-[#3D3D3D] pb-[14px]"
//                 htmlFor="email"
//               >
//                 Enter your username and password to login.
//               </label>
//               <input
//                 value={loginEmail}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                   setLoginEmail(e.target.value)
//                 }
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="email"
//                 type="email"
//                 placeholder="almamun_uxui@outlook.com"
//               />
//             </div>
//             <div className="mb-6">
//               <input
//                 value={loginPassword}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                   setLoginPassword(e.target.value)
//                 }
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                 id="password"
//                 type="password"
//                 placeholder="***********"
//               />
//             </div>
//             <div className="flex items-center justify-between mb-6">
//               <button
//                 onClick={() => setIsModalContent("forgotEmail")}
//                 className="font-normal text-[14px] leading-[16px] text-[#46A358]"
//               >
//                 Forgot Password?
//               </button>
//             </div>
//             <div className="flex items-center justify-between">
//               <Button
//                 title="Login"
//                 buttonWidth={380}
//                 onClick={handleLogin}
//                 bgBtn={false}
//               ></Button>
//             </div>
//             <div className="flex items-center justify-center text-center my-4">
//               <span className="block border-[1px] border-[#EAEAEA] w-[100px] mx-2"></span>
//               <span className="text-gray-600">Or login with</span>
//               <span className="block border-[1px] border-[#EAEAEA] w-[100px] mx-2"></span>
//             </div>
//             <a href="https:google.com" target="_blank">
//               <button
//                 className="bg-white border border-gray-300 text-gray-700 font-bold py-[10px] px-4 rounded flex items-center justify-center w-full  mb-[15px]"
//                 type="button"
//               >
//                 <Image
//                   src="/google-icon.svg"
//                   alt="Login with Google"
//                   width={20}
//                   height={20}
//                   className="mr-2"
//                 />
//                 Continue with Google
//               </button>
//             </a>
//             <a href="https://facebook.com" target="_blank">
//               <button
//                 className="bg-white border border-gray-300 text-gray-700 font-bold py-[10px] px-4 rounded flex items-center justify-center w-full"
//                 type="button"
//               >
//                 <Image
//                   src="/facebook-icon.svg"
//                   alt="Login with Facebook"
//                   width={14}
//                   height={20}
//                   className="mr-2"
//                 />
//                 Continue with Facebook
//               </button>
//             </a>
//           </form>
//         )}

//         {isModalContent == "Register" && (
//           <form className="px-[100px] py-[50px]">
//             <div className="mb-[16px]">
//               <label
//                 className="block font-normal text-[13px] leading-[16px] text-[#3D3D3D] pb-[14px]"
//                 htmlFor="first-name"
//               >
//                 Enter your email and password to register.
//               </label>
//               <input
//                 value={registerFirstName}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                   setRegisterFirstName(e.target.value)
//                 }
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-[#A5A5A5] font-normal leading-tight focus:outline-none focus:shadow-outline"
//                 id="first-name"
//                 type="text"
//                 placeholder="Username"
//               />
//             </div>
//             <input
//               value={registerEmail}
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setRegisterEmail(e.target.value)
//               }
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-[#A5A5A5] font-normal leading-tight focus:outline-none focus:shadow-outline mb-[16px]"
//               id="email"
//               type="email"
//               placeholder="Enter your email address"
//             />
//             <input
//               value={registerPassword}
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setRegisterPassword(e.target.value)
//               }
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-[16px]"
//               id="password"
//               type="password"
//               placeholder="Password"
//             />
//             <input
//               value={registerConfirmPassword}
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setRegisterConfirmPassword(e.target.value)
//               }
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-[41px]"
//               id="confirm-password"
//               type="password"
//               placeholder="Confirm Password"
//             />
//             <div className="flex items-center justify-between">
//               <Button
//                 title="Register"
//                 buttonWidth={380}
//                 onClick={handleRegister}
//                 bgBtn={false}
//               ></Button>
//             </div>
//             <div className="flex items-center justify-center text-center my-4">
//               <span className="block border-[1px] border-[#EAEAEA] w-[100px] mx-2"></span>
//               <span className="text-gray-600 whitespace-nowrap">
//                 Or register with
//               </span>
//               <span className="block border-[1px] border-[#EAEAEA] w-[100px] mx-2"></span>
//             </div>
//             <a href="https://google.com" target="_blank">
//               <button
//                 className="bg-white border border-gray-300 text-gray-700 font-bold py-[10px] px-4 rounded flex items-center justify-center w-full  mb-[15px]"
//                 type="button"
//               >
//                 <Image
//                   src="/google-icon.svg"
//                   alt="Login with Google"
//                   width={20}
//                   height={20}
//                   className="mr-2"
//                 />
//                 Continue with Google
//               </button>
//             </a>
//             <a href="https://facebook.com" target="_blank">
//               <button
//                 className="bg-white border border-gray-300 text-gray-700 font-bold py-[10px] px-4 rounded flex items-center justify-center w-full"
//                 type="button"
//               >
//                 <Image
//                   src="/facebook-icon.svg"
//                   alt="Login with Facebook"
//                   width={14}
//                   height={20}
//                   className="mr-2"
//                 />
//                 Continue with Facebook
//               </button>
//             </a>
//           </form>
//         )}
//         <div className="bg-[#46A358] w-full h-[10px] absolute bottom-0 left-0"></div>
//         {isModalContent == "forgotEmail" && (
//           <div className="flex flex-col items-center space-x-5">
//             <Input
//               className="mb-[16px]"
//               value={forgotLoginEmail}
//               onChange={(e) => setForgotLoginEmail(e.target.value)}
//               placeholder="Enter your Email"
//               size="large"
//             />
//             <Button
//               title="Send Code"
//               buttonWidth={380}
//               onClick={() => {
//                 forgotBtnClick;
//               }}
//               bgBtn={false}
//             ></Button>
//           </div>
//         )}
//         {isModalContent == "registerVerify" && (
//           <div className="flex flex-col items-center">
//             <Input.OTP
//               value={registerOTPCode}
//               onChange={(e) => setRegisterOTPCode(e)}
//               length={6}
//               size="large"
//             />
//             <div className="mt-[16px]">
//               <Button
//                 title="Enter Code"
//                 buttonWidth={360}
//                 onClick={registerVerifyBtnClick}
//                 bgBtn={false}
//               ></Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginModal;

// axios
// const forgotBtnClick = async (event: React.FormEvent) => {
//   event.preventDefault();
//   const data = {
//     email: forgotLoginEmail,
//   };
//   console.log("Forgot Password Data: ", data);
//   try {
//     await axios
//       .post(
//         `${URL}/forgot`,
//         {},
//         {
//           params: {
//             email: forgotLoginEmail,
//           },
//         }
//       )
//       .then((res) => {
//         setIsModalContent("Login");
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// order

// "use client";

// import React, { useEffect, useState } from "react";
// import { URL } from "@/service/request";
// import axios from "axios";

// interface BasketType {
//   basket: boolean;
//   category_id: string;
//   cost: number;
//   count: number;
//   discount: number;
//   image_url: string[];
//   liked: boolean;
//   product_description: string;
//   product_id: string;
//   product_name: string;
//   product_status: string;
//   short_description: string;
//   size: string[];
//   tags: string[];
// }

// const Order = () => {
//   const token = window.localStorage.getItem("token");
//   const [basketList, setBasketList] = useState<BasketType>([]);
//   const [error, setError] = useState(null);
//   console.log(basketList);

//   useEffect(() => {
//     axios
//       .get(`${URL}/basket`, {
//         params: {
//           page: 1,
//           limit: 100,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setBasketList(response.data.ProductId);
//       })
//       .catch((error) => {
//         setError(error.message);
//         console.error("There was an error!", error);
//       });
//   }, [token]);

//   return (
//     <div>
//       <h1>Order</h1>
//     </div>
//   );
// };

// export default Order;

// order page

// "use client";

// import React, { useContext } from "react";
// import { Context } from "@/context/context";
// import { DeleteIcon } from "@/assets/icon";
// import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
// import { Button } from "@/components/Button";
// import Interested from "../page";
// import Link from "next/link";

// interface BasketListType {
//   basket: boolean;
//   category_id: string;
//   cost: number;
//   count: number;
//   discount: number;
//   image_url: string[];
//   liked: boolean;
//   product_description: string;
//   product_id: string;
//   product_name: string;
//   product_status: string;
//   short_description: string;
//   size: string[];
//   tags: string[];
// }

// const Order: React.FC = () => {
//   const { basketList, setBasketList, setRefreshContext, refreshContext } =
//     useContext(Context);

//   const increaseQuantity = (productId: string) => {
//     setBasketList((prev: any) =>
//       prev.map((item: any) =>
//         item.product_id === productId
//           ? { ...item, count: item.count + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQuantity = (productId: string) => {
//     setBasketList((prev: any) =>
//       prev.map((item: any) =>
//         item.product_id === productId && item.count > 1
//           ? { ...item, count: item.count - 1 }
//           : item
//       )
//     );
//   };

//   const removeItem = (productId: string) => {
//     setBasketList((prev: any) =>
//       prev.filter((item: BasketListType) => item.product_id !== productId)
//     );
//   };

//   const calculateTotalCost = () => {
//     let subtotal = 0;
//     basketList.forEach((item: BasketListType) => {
//       subtotal += item.cost * item.count;
//     });
//     return subtotal.toFixed(2);
//   };

//   const totalCost = parseFloat(calculateTotalCost());
//   const shippingCost = 16.0;
//   const finalTotal = (totalCost + shippingCost).toFixed(2);

//   return (
//     <>
//       <div className="container flex justify-between pt-[51px]">
//         <div className="w-full max-w-[782px]">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="py-2 border-b border-[#46A35880] text-left">
//                   Products
//                 </th>
//                 <th className="py-2 border-b border-[#46A35880] text-left">
//                   Price
//                 </th>
//                 <th className="py-2 border-b border-[#46A35880] text-left">
//                   Quantity
//                 </th>
//                 <th className="py-2 border-b border-[#46A35880] text-left">
//                   Total
//                 </th>
//                 <th className="py-2 border-b border-[#46A35880] text-left"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {basketList.map((item: BasketListType) => (
//                 <tr className="relative mt-[10px]" key={item.product_id}>
//                   <td className="py-4 flex items-center">
//                     <img
//                       src={item.image_url[0]}
//                       alt={item.product_name}
//                       className="w-[65px] h-[65px] object-cover mr-4"
//                     />
//                     <div className="max-w-[205px]">
//                       <p className="font-semibold">{item.product_name}</p>
//                       <p className="text-gray-600 text-sm">
//                         SKU: {item.product_id.slice(0, 10)}
//                         {item.product_id.length > 10 ? "..." : ""}
//                       </p>
//                     </div>
//                   </td>
//                   <td className="py-4">${item.cost.toFixed(2)}</td>
//                   <td className="py-4 flex items-center absolute top-[20px]">
//                     <button
//                       className="w-[23px] h-[28px] flex items-center justify-center rounded-[29px] bg-[#46A358]"
//                       onClick={() => decreaseQuantity(item.product_id)}
//                     >
//                       <MinusOutlined className="text-white" />
//                     </button>
//                     <span className="mx-2">{item.count}</span>
//                     <button
//                       className="w-[23px] h-[28px] flex items-center justify-center rounded-[29px] bg-[#46A358]"
//                       onClick={() => increaseQuantity(item.product_id)}
//                     >
//                       <PlusOutlined className="text-white" />
//                     </button>
//                   </td>
//                   <td className="py-4 text-green-500 font-bold">
//                     ${(item.cost * item.count).toFixed(2)}
//                   </td>
//                   <td className="py-4">
//                     <button
//                       className="text-red-500 hover:text-red-700"
//                       onClick={() => removeItem(item.product_id)}
//                     >
//                       <DeleteIcon />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="w-full max-w-[328px] relative">
//           <h2 className="absolute  w-[328px] top-3 border-b border-[#46A35880] pb-[11px] font-bold text-[18px] leading-[16px] text-[#3D3D3D]">
//             Cart Totals
//           </h2>
//           <div className="mt-[40px]">
//             <p className="font-medium text-[15px] leading-[16px] text-[#3D3D3D] pt-[11px]">
//               Coupon Apply
//             </p>
//             <div className="flex mt-[8px] font-normal text-[14px] leading-[16px] text-[#3D3D3D]">
//               <input
//                 placeholder="Enter coupon code here..."
//                 type="text"
//                 className="border border-[#46A358] rounded-l-[3px] px-4 py-[12px] w-full outline-none"
//               />
//               <button className="bg-[#46A358] text-white px-6 rounded-r-[3px] font-bold text-[15px] leading-[16px]">
//                 Apply
//               </button>
//             </div>
//           </div>
//           <div className="">
//             <div className="flex justify-between pt-[30px]">
//               <p className="font-normal text-[15px] leading-[16px]">Subtotal</p>
//               <p className="font-medium text-[18px] leading-[16px] text-[#3D3D3D]">
//                 ${totalCost}
//               </p>
//             </div>
//             <div className="flex justify-between pt-[15px]">
//               <p className="text-[15px] leading-[16px]">Coupon Discount</p>
//               <p className="text-[15px] leading-[16px]">(-) 00.00</p>
//             </div>
//             <div className="flex justify-between pt-[21px]">
//               <p className="text-[15px] leading-[16px]">Shipping</p>
//               <p className="font-medium text-[18px] leading-[16px] text-[#3D3D3D]">
//                 ${shippingCost}
//               </p>
//             </div>
//             <p className="text-[12px] text-[#46A358] font-normal leading-[16px] text-right pt-[8px]">
//               View shipping charge
//             </p>
//           </div>
//           <div className="pt-[50px]">
//             <div className="flex justify-between mb-4">
//               <p className="font-bold text-[16px] leading-[16px] text-[#3D3D3D]">
//                 Total
//               </p>
//               <p className="font-bold text-[18px] leading-[16px] text-[#46A358]">
//                 ${finalTotal}
//               </p>
//             </div>
//             <Link className="mt-[29px]" href={"/shop/checkout"}>
//               <Button
//                 bgBtn={false}
//                 title="Proceed To Checkout"
//                 buttonWidth={332}
//               />
//             </Link>
//             <div className="flex justify-center pt-[14px]">
//               <Link
//                 className="text-[#46A358] text-[15px] leading-[16px] font-normal"
//                 href={"#"}
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Interested />
//     </>
//   );
// };

// export default Order;
// context

// "use client";

// import { URL } from "@/service/request";
// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const Context = createContext<any>(null);
// export const BasketListContext = ({ children }: any) => {
//   const [basketList, setBasketList] = useState<any>([]);
//   const token = window.localStorage.getItem("token");
//   const [refreshContext, setRefreshContext] = useState<boolean>(false);
//   useEffect(() => {
//     if (token) {
//       axios
//         .get(`${URL}/basket`, {
//           params: { page: 1, limit: 100 },
//           headers: { Authorization: "Bearer " + token },
//         })
//         .then((response) => {
//           setBasketList(response.data.ProductId);
//         })
//         .catch((error) => {
//           console.error("Error fetching basket data:", error);
//         });
//     }
//   }, [refreshContext]);

//   return (
//     <Context.Provider
//       value={{ basketList, setBasketList, refreshContext, setRefreshContext }}
//     >
//       {children}
//     </Context.Provider>
//   );
// };
