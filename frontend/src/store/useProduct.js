import {create} from 'zustand'
import axiosInstance from "../lib/axios"

export const useProduct = create((set,get) => ({
    products:[],
    totalProduct: 0,
productsOnSale: 0,
lowStockButNotZero: 0,
outOfStockTotal: 0,
top5:[],
      error: null,
    getAllProducts: async (filters = {}) => {
        try {
 const params = new URLSearchParams();


      if (filters.search) {
        params.append("search", filters.search);
      }
      if (filters.category) {
        params.append("category", filters.category);
      }
     if (filters.minPrice) {
  params.append("minPrice", filters.minPrice);
}

if (filters.maxPrice) {
  params.append("maxPrice", filters.maxPrice);
}
if(filters.sort){
  params.append("sort", filters.sort);
}


        const { data } = await axiosInstance.get(`/api/product/getAll?${params.toString()}`);
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
createProduct: async (formData) => {
  const { data } = await axiosInstance.post("/api/product/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  set((state) => ({ products: [data.product, ...state.products] }));
  return data.product;
},
getInsights:async()=>{
  try {
    const response =  await axiosInstance.get("/api/admin/insights")
    const totalProduct = response.data.totalProduct
     const productsOnSale = response.data.productsOnSale
     const lowStockButNotZero = response.data.lowStockButNotZero
    const outOfStockTotal = response.data.outOfStockTotal

    set({totalProduct,productsOnSale,lowStockButNotZero,outOfStockTotal})
    
  } catch (error) {
    set({error:error.response?.data?.error})
  }
},
top5Products:async()=>{
  try {
    const response= await axiosInstance.get("/api/order/top5BestProducts")
    set({top5:response.data.top5})
    
  } catch (error) {
    set({error:error.response.data?.error})
  }
}





}))