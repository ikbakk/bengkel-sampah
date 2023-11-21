import axios from "axios";
import { useContext, useState } from "react";
import { SellContext } from "@/context/SellContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BASEURL;

const useSellConfirm = () => {
  const session = useSession();

  const router = useRouter();
  const { cartID, transactionBody, setTransactionBody } =
    useContext(SellContext);
  const [loading, setLoading] = useState(false);

  const deleteCartBody = transactionBody.wastes.map((waste) => waste.wasteID);

  const handleDestinationChange = (e) => {
    setTransactionBody({
      ...transactionBody,
      partnerID: e,
    });
  };

  const handleDateChange = (e) => {
    setLoading(true);
    setTransactionBody({
      ...transactionBody,
      transactionDate: new Date(e).toISOString(),
    });
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      `${baseURL}/api/transactions`,
      transactionBody,
      {
        headers: {
          Authorization: session.data?.accessToken,
        },
      },
    );

    if (res.status === 201) {
      await axios
        .delete(`${baseURL}/api/cart/${cartID}/items`, {
          headers: {
            Authorization: session.data?.accessToken,
          },
          data: {
            wasteIDs: deleteCartBody,
          },
        })
        .then(() => {
          setLoading(false);
          router.refresh();
        })
        .catch(() => {
          setLoading(false);
          alert("Pengajuan penjemputan gagal");
        });
    }
  };

  return {
    handleDestinationChange,
    handleSubmit,
    handleDateChange,
    loading,
  };
};

export default useSellConfirm;
