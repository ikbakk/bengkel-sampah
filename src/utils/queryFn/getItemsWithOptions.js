import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

export const getItemsWithOptions = async (route, opts) => {
  try {
    const { data } = await axios.get(`${baseURL}/api/${route}`, opts);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
