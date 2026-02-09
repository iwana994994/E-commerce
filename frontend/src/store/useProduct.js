import {create} from 'zustand'
import axiosInstance from "../lib/axios"

export const useProduct = create((set) => ({
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
}))