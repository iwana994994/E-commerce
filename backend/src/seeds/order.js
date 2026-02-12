import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { ENV } from "../lib/env.js"; // ili gde ti je DB_URL

// Ako ti ENV nije ovde, zameni DB url direktno ili importuj gde ti stoji.
const DB_URL = ENV.DB_URL || process.env.DB_URL;

// ===== helpers =====
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomFrom = (arr) => arr[randInt(0, arr.length - 1)];

const makeStripeSessionId = () =>
  `cs_test_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;

const randomDateInMonth = (year, monthIndex) => {
  // monthIndex: 0-11
  const start = new Date(year, monthIndex, 1, 0, 0, 0, 0);
  const end = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999); // last day
  const t = randInt(start.getTime(), end.getTime());
  return new Date(t);
};

const buildOrderProducts = (allProducts) => {
  const max = Math.min(allProducts.length, 4);
  const itemsCount = randInt(1, max);

  // napravi kopiju, izmešaj i uzmi prvih itemsCount
  const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, itemsCount);

  const products = [];
  let total = 0;

  for (const p of chosen) {
    const quantity = randInt(1, 3);
    const price = typeof p.price === "number" ? p.price : randInt(5, 120);

    products.push({
      product: p._id,
      quantity,
      price,
    });

    total += price * quantity;
  }

  total = Math.round(total * 100) / 100;
  return { products, totalAmount: total };
};
async function seedOrders() {
  if (!DB_URL) throw new Error("DB_URL is missing in ENV / process.env");

  await mongoose.connect(DB_URL);
  console.log("✅ Connected to DB");

  const allProducts = await Product.find().select("_id price");
  if (!allProducts.length) {
    console.log("❌ No products found. Seed products first.");
    process.exit(1);
  }

  // Obriši stare orders (opciono)
  await Order.deleteMany({});
  console.log("🗑️ Cleared existing orders");

  const now = new Date();
  const months = [
    { y: now.getFullYear(), m: now.getMonth() },       // ovaj mesec
    { y: now.getFullYear(), m: now.getMonth() - 1 },   // prošli
    { y: now.getFullYear(), m: now.getMonth() - 2 },   // pretprošli
  ].map(({ y, m }) => {
    const d = new Date(y, m, 1);
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  const fakeUsers = [
    "user_1a2b3c",
    "user_4d5e6f",
    "user_7g8h9i",
    "user_10j11k",
    "user_12l13m",
  ];

  const ordersToInsert = [];

  for (const { y, m } of months) {
    // npr. 8-18 ordera po mesecu
    const ordersThisMonth = randInt(8, 18);

    for (let i = 0; i < ordersThisMonth; i++) {
      const { products, totalAmount } = buildOrderProducts(allProducts);

      const createdAt = randomDateInMonth(y, m);

      ordersToInsert.push({
        userId: randomFrom(fakeUsers),
        products,
        totalAmount,
        stripeSessionId: makeStripeSessionId(),
        createdAt,
        updatedAt: createdAt,
      });
    }
  }

  const inserted = await Order.insertMany(ordersToInsert, { ordered: false });
  console.log(`✅ Inserted ${inserted.length} orders for last 3 months`);

  await mongoose.disconnect();
  console.log("✅ Done");
}

seedOrders().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
