import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

export const getItemsWithOptions = async (route, opts) => {
  try {
    console.log("getItemsWithOptions", route, opts, baseURL);
    const { data } = await axios.get(`${baseURL}/api/${route}`, opts);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
