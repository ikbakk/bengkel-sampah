import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export const deleteItem = async (route, memberID, opts) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/api/${route}/${memberID}`,
      opts,
    );
    return data;
  } catch (error) {}
};
