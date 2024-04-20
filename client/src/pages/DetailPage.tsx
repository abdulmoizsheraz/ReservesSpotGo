import { useGetRestaurant } from "@/api/RestaurantApi";
import { useState,useEffect } from "react";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import CheckoutButton from "@/components/CheckoutButton";
import { table } from "console";

export type CartItem = {
  tableNumber: number;
  restaurantId: any;
  reservationTime: string;
};

const DetailPage = () => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const addToCart = (tableNumber: number, reservationTime: string) => {
    const newCartItem: CartItem = {
      tableNumber,
      restaurantId,
      reservationTime,
    };
    sessionStorage.setItem("cartItems", JSON.stringify(newCartItem));
  };


  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>

          {restaurant.menuItems.map((menuItem) => (
            <MenuItem menuItem={menuItem}  />
          ))}
          <span className="text-2xl font-bold tracking-tight">
            Available Tables
          </span>
          <div className="flex gap-2">
            {Array.from({ length: restaurant.tables }, (_, index) => (
              <div key={index + 1} className="flex items-center">
                <button
                  className={`w-12 h-12 rounded-full border border-gray-300 ${
                    selectedTable === index + 1 ? "bg-green-500 text-white" : ""
                  }`}
                  onClick={() =>
                    setSelectedTable(selectedTable === index + 1 ? null : index + 1)
                  }
                >
                  {index + 1}
                </button>
                {selectedTable === index + 1 && (
                  <select
                    className="ml-2 p-2 border border-gray-300 rounded-md"
                    onChange={(e) =>
                      addToCart(index + 1, e.target.value)
                    }
                  >
                    <option value="">Select time</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <OrderSummary
            />
            <CardFooter>
              <CheckoutButton
                disabled={sessionStorage.getItem("cartItems")?false:true}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
