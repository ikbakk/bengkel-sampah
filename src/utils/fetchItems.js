import { cache } from "react";
import axios from "axios";

const baseURL = process.env.BASEURL;

export const revalidate = 0;

export const fetchItems = cache(async (route, token) => {
  const { data } = await axios.get(`${baseURL}${route}`, {
    headers: {
      Authorization: token,
    },
  });
  return data;
});

export const fetchItemsWithOptions = cache(async (route, opts) => {
  const { data } = await axios.get(`${baseURL}${route}`, opts);
  return data;
});
