import {create} from "zustand"
import axiosInstance from "../lib/axios.jsx"
export const useCart = create((set,get) => ({
  cart: [],


  addToCart: async (productId) => {
  const { data } = await axiosInstance.post("/api/cart/create", { productId });
  set({ cart: data.cart });
},

removeFromCart: async (productId) => {
  const { data } = await axiosInstance.delete(`/api/cart/remove/${productId}`);
  set({ cart: data.cart });
},

fetchCart: async () => {
  const { data } = await axiosInstance.get("/api/cart/allItems");
  set({ cart: data.cart });
},
checkout: async () => {
    const cart = get().cart;

    // cart item izgleda: { product: {...}, quantity }
    const products = cart.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));

    const { data } = await axiosInstance.post("/api/order/createOrder", {
      products
    });

    return data; // { id: session.id, totalAmount: ... }
  },
clearCart: async () => {
  await axiosInstance.delete("/api/cart/clear");
  set({ cart: [] });
}


}));
