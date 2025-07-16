// https://dummyjson.com/products/search?q=hello
// https://dummyjson.com/products/1

import { createApi } from "@edge-effect/react-tanstack-query-factory";
import axios from "axios";

import {
  GetProduct,
  GetSearch,
} from "@/component/view/react-tanstack-query-factory/type";

export const getProduct = createApi<
  GetProduct["path"],
  GetProduct["param"],
  GetProduct["body"],
  { description: string }
>({
  onCreateKeys: (payload) => ["getProduct", payload],
  onRequest: async ({ path }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await axios.get(
      `https://dummyjson.com/products/${path.productId}`
    );
    return data;
  },
});

export const getSearch = createApi<
  GetSearch["path"],
  GetSearch["param"],
  GetSearch["body"],
  unknown
>({
  onCreateKeys: (payload) => ["getSearch", payload],
  onRequest: async ({ param }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data } = await axios.get("https://dummyjson.com/products/search", {
      params: param,
    });
    return data;
  },
});
