import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export const updateItem = async (route, body, token) => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/${route}`,
      {
        ...body,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return data;
  } catch (error) {}
};
