import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartItem } from "@/pages/DetailPage";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { User } from "@/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "name is required"),
});

type CreateReservation = {
  tableNumber: number;
  restaurantId: string;
  reservationTime: string;
};

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  onSave?: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title = "User Profile",
  buttonText = "Submit",
}: Props) => {
  const { getAccessTokenSilently } = useAuth0(); // Moved inside the component

  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  const createCheckoutSessionRequest = async (cartObject: CartItem) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/reserv`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartObject),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create reservation");
    }
    return response.json();
  };

  const [cartobj, setcartobj] = useState<CartItem | null>(null);

  useEffect(() => {
    const storedCartItems: CartItem | null = JSON.parse(sessionStorage.getItem(`cartItems`) || 'null');
    setcartobj(storedCartItems);
  }, []);

  return (
    <>
      <ToastContainer />
      <Form {...form}>
        <form className="space-y-4 bg-gray-50 rounded-lg md:p-10">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <FormDescription>
              View and change your profile information here
            </FormDescription>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <LoadingButton />
          ) : (
            <button onClick={async (e) => {
              e.preventDefault();
              try {
                await createCheckoutSessionRequest(cartobj!);
                toast.success('Reservation created successfully!');
              } catch (error) {
                console.error("Error creating reservation:", error);
                toast.error('Failed to create reservation');
              }
            }} className="bg-red-700 p-4 rounded-md text-white">
              {buttonText}
            </button>
          )}
        </form>
      </Form>
    </>
  );
};

export default UserProfileForm;
