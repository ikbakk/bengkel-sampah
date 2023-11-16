import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export const addItem = async (route, body, token) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/api/${route}`,
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
