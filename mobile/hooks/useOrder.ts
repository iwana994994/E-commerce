import { create } from "zustand";
import { api } from "@/lib/axios";
import { Order } from "@/type/Order";
import { useUser } from "@clerk/clerk-expo";

type OrderStore = {
  orders: Order[];
  error: string | null;
  fetchOrder: () => Promise<void>;
};

const useOrder = create<OrderStore>((set) => ({
  orders: [],
  error: null,

 fetchOrder: async () => {
  try {
    const { data } = await api.get("/api/order/userOrders");
    set({ orders: data.orders, error: null });
  } catch (error: any) {
    set({ error: error?.response?.data?.error || error.message });
  }
},
}));

export default useOrder;