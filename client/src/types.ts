export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
  tables:any
};



  export type Order = {
    createdAt: string;
    reservationTime: string;
    restaurant: {
      _id: string;
      restaurantName: string;
      city: string;
      country: string;
      deliveryPrice: number;
    };
    tableNumber: number;
    user: {
      _id: string;
      email: string;
      addressLine1: string;
    };
    _id: string;
  };
  
  

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
