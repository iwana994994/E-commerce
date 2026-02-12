import {create} from "zustand"
import axiosInstance from "../lib/axios.jsx"

export const useCategory=create((set)=>({
categories:[],
getAllCategories: async () => {
  const { data } = await axiosInstance.get("/api/category/getAll");
  set({ categories: data.categories });
}



}

))