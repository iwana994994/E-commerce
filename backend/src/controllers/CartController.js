

import Cart from "../models/Cart.js";

export const createCart = async (req, res) => {
  try {
    const userId = req.auth.userId; // Clerk
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ product: productId, quantity: 1 }]
      });
    } else {
      const existingItem = cart.items.find(
        item => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }

      await cart.save();
    }

    await cart.populate("items.product");

    res.status(200).json({ cart: cart.items });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart) {
      return res.status(200).json({ cart: [] });
    }

    res.status(200).json({ cart: cart.items });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const removeProducts = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { id } = req.params;

    const cart = await Cart.findOne({ userId });

    cart.items = cart.items.filter(
      item => item.product.toString() !== id
    );

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ cart: cart.items });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const changeProducts = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    const item = cart.items.find(
      item => item.product.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({ cart: cart.items });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.auth();

    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


