import { create } from "zustand";
import axiosInstance from "../lib/axios";

export const useOrder = create((set) => ({
  orders: [],
  error: null,
  loading: false,
  totalOrders: 0,
  totalIncome: 0,
  totalIncomeToday:0,
  todayCountOrder:0,
  ordersPerMonth: [],

  fetchOrder: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get("/api/order/allOrders");
      set({ orders: data.orders, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || error.message,
        loading: false,
      });
    }
  },
  fetchOrderStats: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get("/api/order/stats");
      set({
        totalOrders: data.totalOrders,
        totalIncome: data.totalIncome,
        totalIncomeToday:data.totalIncomeToday,
        todayCountOrder:data.todayCountOrder,
        loading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.error || error.message, loading: false });
    }
  },
fetchOrderChart: async () => {
  try {
    const { data } = await axiosInstance.get("/api/order/chart");
    set({ ordersPerMonth: data.ordersPerMonth });
  } catch (error) {
    set({ error: error.response?.data?.error || error.message });
  }
},
incomeChart: [],
fetchIncomeChart: async () => {
  try {
    const { data } = await axiosInstance.get("/api/order/pie");
    set({ incomeChart: data.income });
  } catch (error) {
    console.error(error);
  }
},


}));
