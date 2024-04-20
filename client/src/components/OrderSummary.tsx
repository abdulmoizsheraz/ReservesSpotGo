import { CartItem } from "@/pages/DetailPage";
import { useState, useEffect } from "react";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

const OrderSummary = () => {
  // Corrected state initialization type
  const [cartobj, setcartobj] = useState<CartItem | null>(null);

  useEffect(() => {
    const storedCartItems: CartItem | null = JSON.parse(sessionStorage.getItem(`cartItems`) || 'null'); // Parsing the stored value as JSON and handling null case
    setcartobj(storedCartItems);
  }, []);

  const removeFromCart = () => {
    sessionStorage.removeItem("cartItems");
    setcartobj(null); // Reset cartobj state after removing from sessionStorage
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Reservations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col font-bold gap-5">
        {cartobj && ( // Conditional rendering to handle null case
          <div key={`${cartobj.tableNumber}-${cartobj.reservationTime}`} className="flex gap-3 cursor-pointer items-center">
            <span>Table no: {cartobj.tableNumber}, Time: {cartobj.reservationTime}</span>
            {/* Invoking removeFromCart correctly */}
            <span onClick={removeFromCart}><Trash color="red" /></span>
          </div>
        )}
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
