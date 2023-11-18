import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export const deletePartnerItem = async (route, partnerID, token) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/${route}/${partnerID}`, {
      headers: {
        Authorization: token,
      },
    });
    return data;
  } catch (error) {
    return console.error(error);
  }
};

export const deleteAllPartnerItems = async (route, opts) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/${route}`, opts);
    return data;
  } catch (error) {
    return console.error(error);
  }
};
