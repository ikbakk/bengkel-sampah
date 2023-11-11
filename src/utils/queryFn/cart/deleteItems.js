import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export const deleteItems = async (route, opts) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/${route}`, opts);
    return data;
  } catch (error) {}
};
