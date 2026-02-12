import {create} from 'zustand'
import axiosInstance from "../lib/axios"

export const useProduct = create((set,get) => ({
    products:[],
      error: null,
    getAllProducts: async () => {
        try {
        const { data } = await axiosInstance.get("/api/product/getAll");
         set({ products: data.products });
        } catch (error) {
            set({ error: error.response?.data?.error || error.message });
        }
    },
    deleteProduct: async (productId) => {
        try {
            await axiosInstance.delete(`/api/product/delete/${productId}`);
            set((state) => ({
                products: state.products.filter((p) => p._id !== productId),
            }));
        } catch (error) {
            set({ error: error.response?.data?.error || error.message });
        }
},
editProduct: async (productId, updatedData) => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/product/edit/${productId}`,
      updatedData
    );

    // ✅ update u state-u (da se odmah vidi u tabeli)
    set({
      products: get().products.map((p) =>
        p._id === productId ? data.product : p
      ),
      error: null,
    });
  } catch (error) {
    set({ error: error.response?.data?.error || error.message });
  }
},
createProduct: async (payload) => {
  const { data } = await axiosInstance.post("/api/product/create", payload);
  set((state) => ({ products: [data.product, ...state.products] }));
  return data.product;
},



}))