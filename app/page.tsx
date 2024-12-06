"use client";
import HeroMobile from "@/components/HeroCarusel/HeroMobile";
import HeroCarusel from "../components/HeroCarusel";
import { RangeSlider } from "@/components/RangeSlider";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { URL } from "../service/request";
import { Product } from "@/components/Product";
import { Pagination } from "antd";
import Image from "next/image";
import SummerCom from "@/components/SummerCom";
import BlogCom from "@/components/BlogCom";
import axios from "axios";

interface Categories {
  category_id: string;
  category_name: string;
}

interface PlantProductsType {
  product_id: string;
  product_name: string;
  cost: string;
  image: string;
}

interface SizeType {
  size_id: number;
  size_name: string;
}

interface TagNavbarType {
  tag_id: number;
  tag_name: string;
  path: string | null;
}

interface ProductType {
  basket: boolean;
  category_id: string;
  cost: number;
  count: number;
  discount: number;
  image_url: string;
  liked: boolean;
  product_description: string;
  product_id: string;
  product_name: string;
  product_status: string;
  short_description: string;
  size: [];
  tags: [];
}

function Home() {
  const token = window.localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(1);
  const [limited, setLimited] = useState<number>(10);
  const [arrow, setArrow] = useState<string>("Show");
  const [category, setCategory] = useState<Array<Categories>>([]);
  const [categoriesId, setCategoriesId] = useState<string | null>(null);
  const [tagNavbarId, setTagNavbarId] = useState<string | null>("");
  const [sizeId, setSizeId] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([39, 1500]);
  const [plantProducts, setPlantProduct] = useState<Array<ProductType>>([]);

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    } else {
      pointAtCenter: true;
    }
  }, [arrow]);

  const size: SizeType[] = [
    {
      size_id: 1,
      size_name: "Small",
    },
    {
      size_id: 2,
      size_name: "Medium",
    },
    {
      size_id: 3,
      size_name: "Large",
    },
  ];

  const tagNavbar: TagNavbarType[] = [
    {
      tag_id: 1,
      tag_name: "All Plants",
      path: null,
    },
    {
      tag_id: 2,
      tag_name: "New Arrivals",
      path: "new-arrival",
    },
    {
      tag_id: 3,
      tag_name: "Sale",
      path: "sale",
    },
  ];

  useEffect(() => {
    axios.get(`${URL}/categories?page=1&limit=100`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    }).then((res) => {
      setCategory(res.data.categories)
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${URL}/products`, {
        params: {
          page: pages,
          limit: 10,
          name: null,
          status: tagNavbarId,
          category: categoriesId,
          size: sizeId,
          min_price: priceRange ? priceRange[0] : null,
          max_price: priceRange ? priceRange[1] : null,
        },
        headers: token
          ? {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
          }
          : {},
      })
      .then((res) => {
        setIsLoading(false);
        // console.log(res.data.products);
        setPlantProduct(res.data.products);
        setLimited(res.data.total_count);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [categoriesId, sizeId, tagNavbarId, priceRange, pages, refresh]);

  if (!plantProducts) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <section className="pt-[12px] pb-[46px]">
        <div className="container px-5 md:px-0">
          <HeroCarusel />
          <HeroMobile />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-x-[50px] gap-y-[30px]">
            <div className="w-full md:w-[310px] bg-[#FBFBFB]">
              <div className="p-[15px]">
                <h2 className="font-bold text-[18px] leading-[16px]">
                  Categories
                </h2>
                <ul className="pl-[12px] space-y-[15px] mt-[20px] mb-[36px]">
                  {category &&
                    Array.isArray(category) &&
                    category?.length > 0 &&
                    category?.map((item: Categories) => (
                      <li
                        key={item.category_id}
                        onClick={() => {
                          setIsLoading(true);
                          setTimeout(() => {
                            setCategoriesId(item.category_name);
                          }, 500);
                        }}
                        className={`flex items-center justify-between cursor-pointer ${categoriesId == item.category_name
                          ? "text-[#46A358] font-bold"
                          : ""
                          }`}
                      >
                        <span>{item.category_name}</span>
                      </li>
                    ))}
                </ul>
                <h2 className="font-bold text-[18px] leading-[16px]">
                  Price Range
                </h2>
                <RangeSlider setRangeValue={setPriceRange} />
                <h2 className="font-bold text-[18px] leading-[16px] mt-[46px]">
                  Size
                </h2>
                <ul className="pl-[12px] space-y-[15px] mt-[20px] mb-[36px]">
                  {size?.map((item: SizeType) => (
                    <li
                      onClick={() => setSizeId(item.size_name)}
                      className={`flex items-center justify-between cursor-pointer ${sizeId == item.size_name
                        ? "text-[#46A358] font-bold"
                        : ""
                        }`}
                      key={item.size_id}
                    >
                      <span>{item.size_name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={"#"}>
                <Image
                  src="/Super-Sale2.png"
                  alt="Plant"
                  width={310}
                  height={470}
                  priority={true}
                  className="mx-auto hidden md:block"
                />
              </Link>
            </div>
            <div className="w-full md:w-[840px]">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <ul className="flex items-center space-x-[37px] mb-[20px] md:mb-0">
                  {tagNavbar.map((item: TagNavbarType) => (
                    <li
                      className={`cursor-pointer ${tagNavbarId == item.path
                        ? "text-[#46A358] font-semibold border-b-[3.5px] pb-[7px] border-[#46A358]"
                        : ""
                        }`}
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setTagNavbarId(item.path);
                        }, 600);
                      }}
                      key={item.tag_id}
                    >
                      {item.tag_name}
                    </li>
                  ))}
                </ul>
                <div>
                  Short by: Default sorting
                  <select>
                    <option>Title Sort</option>
                    <option> Price Sort</option>
                  </select>
                </div>
              </div>
              <ul className="mt-[31px] flex flex-wrap gap-[30px] text-center md:text-left justify-center md:justify-start">
                {plantProducts?.length
                  ? plantProducts.map((item: ProductType) => (
                    <Product
                      setRefresh={setRefresh}
                      refresh={refresh}
                      key={item.product_id}
                      item={item}
                    />
                  ))
                  : "Empty Product..."}
              </ul>
              <div className="mt-[90px] flex justify-center md:justify-end">
                <Pagination
                  onChange={(e) => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setPages(e);
                    }, 600);
                  }}
                  defaultCurrent={pages}
                  total={limited}
                />
              </div>
            </div>
          </div>
          <SummerCom />
          <BlogCom />
        </div>
      </section>
    </>
  );
}

export default Home;
