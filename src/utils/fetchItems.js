import { cache } from "react";
import axios from "axios";

const baseURL = process.env.BASEURL;

export const revalidate = 0;

export const fetchItems = cache(async (route, token) => {
  try {
    const { data } = await axios.get(`${baseURL}${route}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
});

export const fetchItemsWithOptions = cache(async (route, opts) => {
  try {
    const { data } = await axios.get(`${baseURL}${route}`, opts);
    return data;
  } catch (error) {
    return error.response;
  }
});
