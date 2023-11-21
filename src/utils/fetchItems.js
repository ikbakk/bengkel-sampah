import { cache } from "react";
import axios from "axios";

const baseURL = process.env.BASEURL;

export const revalidate = 0;

export const fetchItems = cache(async (route, token) => {
  try {
    const { status, data } = await axios.get(`${baseURL}${route}`, {
      headers: {
        Authorization: token,
      },
    });
    return { status, data: data.data };
  } catch (error) {
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
