import { cache } from "react";
import axios from "axios";

const baseURL = process.env.BASEURL;

export const revalidate = 0;

export const fetchItems = cache(async (route) => {
  const { data } = await axios.get(`${baseURL}${route}`);
  return data;
});

export const fetchItemsWithParams = cache(async (route, params) => {
  const { data } = await axios.get(`${baseURL}${route}`, {
    params,
  });
  return data;
});
