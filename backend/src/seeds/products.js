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

    // 🐾 Kreiraj kategorije
    const categories = await Category.insertMany([
      { name: "Cat Birthday Cakes", image: "cat-cakes.jpg",isActive:true },
      { name: "Mini Paw Cupcakes", image: "cupcakes.jpg",isActive:true },
      { name: "Healthy Cat Treats", image: "treats.jpg",isActive:true },
    ]);

    // 🎂 Kreiraj proizvode
    const products = [
      {
        name: "Salmon Dream Birthday Cake",
        image: "https://images.unsplash.com/photo-1604908176997-4313c7e9d9ad",
        price: 35,
        category: categories[0]._id,
      },
      {
        name: "Tuna Surprise Paw Cake",
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7",
        price: 30,
        category: categories[0]._id,
      },
      {
        name: "Mini Chicken Paw Cupcakes (6pcs)",
        image: "https://images.unsplash.com/photo-1587248720327-8eb72564be1e",
        price: 18,
        category: categories[1]._id,
      },
      {
        name: "Grain-Free Cat Cookies",
        image: "https://images.unsplash.com/photo-1590080876645-3c4d1c3a4b7f",
        price: 12,
        category: categories[2]._id,
      },
      {
        name: "Organic Catnip Energy Bites",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
        price: 15,
        category: categories[2]._id,
      },
    ];

    await Product.insertMany(products);

    console.log("Cat Cake database seeded successfully 🐾🍰");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
