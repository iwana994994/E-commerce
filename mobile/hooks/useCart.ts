import { create } from "zustand";
import { api } from "@/lib/axios";
import { CartLine } from "@/type/CartType";


type CheckoutResponse = {
  url?: string;
  id?: string;
  totalAmount?: number;
};
type CartStore = {
  carts: CartLine[] | null;
  error: string | null;

  fetchCart: () => Promise<void>;
  addToCart: (productId: string, qty?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
    checkout: () => Promise<CheckoutResponse>;
 clearCart:()=>Promise<void>
 
};

export const useCart = create<CartStore>((set, get) => ({
  carts: null,

  error: null,



  fetchCart: async () => {
 
    try {
      const { data } = await api.get("/api/cart/allItems"); 
      console.log("Cart data:", data.cart);
      set({ carts: data.cart,});
    } catch (e: any) {
      set({ error: e?.response?.data?.error || e.message });
    }
  },

  addToCart: async (productId, qty = 1) => {
    
    try {
      const { data } = await api.post("/api/cart/create", { productId, qty }); 
      set({ carts: data.cart,  });
    } catch (e: any) {
      set({ error: e?.response?.data?.error || e.message });
    }
  },

  removeFromCart: async (productId) => {
 
    try {
    const { data } = await api.delete(`/api/cart/remove/${productId}`);
      set({ carts: data.cart, });
    } catch (e: any) {
      set({ error: e?.response?.data?.error || e.message });
    }
  },
checkout: async () => {
  const cart = get().carts;
  if (!cart || cart.length === 0) return {};

  const products = cart.map((item) => ({
    productId: item.product._id,
    quantity: item.quantity,
  }));

  const { data } = await api.post("/api/order/createOrder", { products });
  return data;
},
clearCart: async () => {
  await api.delete("/api/cart/clear");
  set({ carts: [] });
}



}));