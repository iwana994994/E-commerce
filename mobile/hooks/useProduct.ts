
import {create} from "zustand"
import {api} from "../lib/axios"
import { Product } from "@/type/ProductType";

type ProductStore = {
  products: Product[];
  error:string | null,
  getProducts: () => Promise<void>;
};
const useProduct = create<ProductStore>((set) => ({
    

    products:[],
    error:null,
    
    getProducts: async () => {
        try {
             console.log("GET:", api.defaults.baseURL + "/api/product/getAll")
           const res= await api.get("/api/product/getAll")

           console.log("RES DATA:", res.data)
           set({products:res.data.products})

            
        } catch (error:any) {
            set({error:error?.message || "Something went wrong with the server for fetching products Please try again later."})
        }   
    }
}))
    
export default useProduct