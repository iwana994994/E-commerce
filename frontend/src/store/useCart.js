import { create } from "zustand";

export const useCart = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const existing = get().cart.find(p => p._id === product._id);

    if (existing) {
      set({
        cart: get().cart.map(p =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      });
    } else {
      set({
        cart: [...get().cart, { ...product, quantity: 1 }]
      });
    }
  },
  removeFromCart: (id) => {
  set({
    cart: get().cart.filter(item => item._id !== id)
  });
}
}));
