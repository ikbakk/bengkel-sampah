import sameElementCheck from "@/lib/sameElementCheck";

import { CartContext } from "@/context/CartContext";
import { Button, Checkbox } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import useCartItemsDelete from "@/hooks/useCartItemsDelete";

const CartSelectAll = ({ hideButton, onChange, cartID }) => {
  const { handleDelete } = useCartItemsDelete(cartID);
  const { cartItems, selectedCartItems } = useContext(CartContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const wasteIds = cartItems.map((item) => item.waste.wasteID);
    const isSame = sameElementCheck(wasteIds, selectedCartItems);
    if (isSame) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCartItems]);

  const handleChange = () => {
    onChange(isChecked);
    setIsChecked((prev) => !prev);
  };

  return (
    <div
      className={`${hideButton} flex w-full items-center justify-between gap-4`}
    >
      <div
        onClick={handleChange}
        className="flex items-center hover:cursor-pointer"
      >
        <Checkbox checked={isChecked} onChange={handleChange} color="red" />
        <p className="text-bs-font_primary">Pilih Semua</p>
      </div>
      <Button onClick={handleDelete} color="red" className="px-12">
        Hapus
      </Button>
    </div>
  );
};

export default CartSelectAll;
