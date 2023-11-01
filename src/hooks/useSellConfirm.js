import axios from "axios";
import { useContext, useState } from "react";
import { SellContext } from "@/context/SellContext";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const useSellConfirm = () => {
  const { cartID, transactionBody, setTransactionBody } =
    useContext(SellContext);
  const [loading, setLoading] = useState(true);

  const deleteCartBody = transactionBody.wastes.map((waste) => waste.wasteID);

  const handleDestinationChange = (e) => {
    setTransactionBody({
      ...transactionBody,
      partnerID: e,
    });
  };

  const handleDateChange = (e) => {
    setTransactionBody({
      ...transactionBody,
      transactionDate: new Date(e).toISOString(),
    });
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      `${baseURL}/api/transactions`,
      transactionBody,
    );

    if (res.status === 201) {
      await axios
        .delete(`${baseURL}/api/cart/${cartID}/items`, {
          data: {
            wasteIDs: deleteCartBody,
          },
        })
        .then(() => setLoading(false));
    }
    // console.log({ wasteIDs: deleteCartBody });
  };

  return {
    handleDestinationChange,
    handleSubmit,
    handleDateChange,
    loading,
  };
};

export default useSellConfirm;
