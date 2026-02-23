import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected 🐱");

    // Očisti bazu
    await Product.deleteMany();
    await Category.deleteMany();

    // 🐾 Kreiraj kategorije (food group)
    const categories = await Category.insertMany([
      { name: "Cat Birthday Cakes", image: "cat-cakes.jpg", group: "food", isActive: true },
      { name: "Mini Paw Cupcakes", image: "cupcakes.jpg", group: "food", isActive: true },
      { name: "Healthy Cat Treats", image: "treats.jpg", group: "food", isActive: true },
    ]);

    const now = new Date();
    const in7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const in14Days = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

    // 🎂 Kreiraj 10 proizvoda
    const products = [
      // Cat Birthday Cakes
      {
        name: "Salmon Dream Birthday Cake",
        image: "https://images.unsplash.com/photo-1604908176997-4313c7e9d9ad?auto=format&fit=crop&w=900&q=80",
        price: 35,
        category: categories[0]._id,
        stock: 8,
        lowStockThreshold: 2,
        sale: { enabled: true, type: "PERCENT", value: 15, startAt: now, endAt: in7Days },
      },
      {
        name: "Tuna Surprise Paw Cake",
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=900&q=80",
        price: 30,
        category: categories[0]._id,
        stock: 0,
        lowStockThreshold: 3,
        sale: { enabled: false, type: "PERCENT", value: 0, startAt: null, endAt: null },
      },
      {
        name: "Chicken & Pumpkin Celebration Cake",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
        price: 32,
        category: categories[0]._id,
        stock: 5,
        lowStockThreshold: 2,
        sale: { enabled: true, type: "FIXED", value: 3, startAt: now, endAt: in14Days },
      },
      {
        name: "Sardine Party Mini Cake",
        image: "https://images.unsplash.com/photo-1542826438-6f1d7b1b6b1b?auto=format&fit=crop&w=900&q=80",
        price: 22,
        category: categories[0]._id,
        stock: 12,
        lowStockThreshold: 4,
        sale: { enabled: false, type: "PERCENT", value: 0, startAt: null, endAt: null },
      },

      // Mini Paw Cupcakes
      {
        name: "Mini Chicken Paw Cupcakes (6pcs)",
        image: "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?auto=format&fit=crop&w=900&q=80",
        price: 18,
        category: categories[1]._id,
        stock: 20,
        lowStockThreshold: 5,
        sale: { enabled: true, type: "PERCENT", value: 10, startAt: now, endAt: in7Days },
      },
      {
        name: "Mini Salmon Paw Cupcakes (6pcs)",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=80",
        price: 19,
        category: categories[1]._id,
        stock: 6,
        lowStockThreshold: 3,
        sale: { enabled: false, type: "PERCENT", value: 0, startAt: null, endAt: null },
      },
      {
        name: "Mini Turkey Paw Cupcakes (6pcs)",
        image: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?auto=format&fit=crop&w=900&q=80",
        price: 17,
        category: categories[1]._id,
        stock: 3,
        lowStockThreshold: 3,
        sale: { enabled: true, type: "FIXED", value: 2, startAt: now, endAt: in7Days },
      },

      // Healthy Cat Treats
      {
        name: "Grain-Free Cat Cookies",
        image: "https://images.unsplash.com/photo-1590080876645-3c4d1c3a4b7f?auto=format&fit=crop&w=900&q=80",
        price: 12,
        category: categories[2]._id,
        stock: 25,
        lowStockThreshold: 6,
        sale: { enabled: false, type: "PERCENT", value: 0, startAt: null, endAt: null },
      },
      {
        name: "Organic Catnip Energy Bites",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
        price: 15,
        category: categories[2]._id,
        stock: 2,
        lowStockThreshold: 4,
        sale: { enabled: true, type: "PERCENT", value: 20, startAt: now, endAt: in14Days },
      },
      {
        name: "Duck & Cranberry Soft Treats",
        image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=900&q=80",
        price: 14,
        category: categories[2]._id,
        stock: 9,
        lowStockThreshold: 3,
        sale: { enabled: false, type: "PERCENT", value: 0, startAt: null, endAt: null },
      },
    ];

    await Product.insertMany(products);

    console.log("Cat food database seeded successfully 🐾🍰");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();