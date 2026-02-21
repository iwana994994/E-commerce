import { create } from "zustand";
import { api } from "@/lib/axios";
import { Order } from "@/type/Order";

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
      console.log("ORDER => GET /api/order/userOrders");
      const { data } = await api.get("/api/order/userOrders");
      console.log("ORDER => RES:", data);

      set({ orders: data.orders ?? [], error: null });
    } catch (error: any) {
      console.log("ORDER => ERROR:", error?.response?.status, error?.response?.data);
      set({ error: error?.response?.data?.error || error.message });
    }
  },
}));

export default useOrder;