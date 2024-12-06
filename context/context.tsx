"use client";

import { URL } from "@/service/request";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface BasketType {
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

export const Context = createContext<any>(null);

export const BasketListContext = ({ children }: any) => {
  const [basketList, setBasketList] = useState<BasketType[]>([]);
  const token = localStorage.getItem("access_token");
  const [refreshContext, setRefreshContext] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      axios
        .get(`${URL}/basket`, {
          params: { page: 1, limit: 100 },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setBasketList(response.data.ProductId);
        })
        .catch((error) => {
          console.error("Error fetching basket data:", error);
        });
    }
  }, [refreshContext]);
  
  useEffect(() => {
    if (token) {
      axios
        .get(`${URL}/basket`, {
          params: {
            page: 1,
            limit: 100,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBasketList(response.data.ProductId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [token]);

  return (
    <Context.Provider
      value={{ basketList, setBasketList, refreshContext, setRefreshContext }}
    >
      {children}
    </Context.Provider>
  );
};



// "use client";

// import { createContext, useEffect, useState } from "react";

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

// export const Context = createContext<any>(null);

// export const BasketListContext = ({ children }: any) => {
//   const [basketList, setBasketList] = useState<BasketType[]>([]);
//   const [refreshContext, setRefreshContext] = useState<boolean>(false);

//   // Load basket list from localStorage
//   useEffect(() => {
//     const storedBasket = localStorage.getItem("basket_list");
//     if (storedBasket) {
//       setBasketList(JSON.parse(storedBasket));
//     }
//   }, []);

//   // Save basket list to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("basket_list", JSON.stringify(basketList));
//   }, [basketList]);

//   return (
//     <Context.Provider
//       value={{ basketList, setBasketList, refreshContext, setRefreshContext }}
//     >
//       {children}
//     </Context.Provider>
//   );
// };
