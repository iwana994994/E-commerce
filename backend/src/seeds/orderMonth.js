import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

dotenv.config();

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedOrdersThisMonth = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected ✅");

    // ✅ Očisti order-e (da test bude čist)
    await Order.deleteMany({});
    console.log("Orders cleared 🧹");

    // ✅ Učitaj proizvode (mora da postoji bar 5)
    const products = await Product.find().limit(50);
    if (products.length < 5) {
      console.log("❌ Need at least 5 products in DB to seed orders.");
      process.exit(1);
    }
    console.log(`Found ${products.length} products ✅`);

    // ✅ Granice ovog meseca
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const makeStripeId = (i) =>
      `seed_${Date.now()}_${i}_${Math.random().toString(16).slice(2)}`;

    const ordersToCreate = [];

    // ✅ napravi 12 ordera u ovom mesecu
    for (let i = 0; i < 12; i++) {
      // random datum u ovom mesecu
      const createdAt = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime() - 1)
      );

      const itemsCount = randomInt(1, 4);
      const used = new Set();

      const items = [];
      let totalAmount = 0;

      for (let j = 0; j < itemsCount; j++) {
        let p = pickRandom(products);
        while (used.has(String(p._id))) p = pickRandom(products);
        used.add(String(p._id));

        const quantity = randomInt(1, 6);
        const price = Number(p.price); // snapshot cene u order-u

        items.push({
          product: p._id,
          quantity,
          price,
        });

        totalAmount += quantity * price;
      }

      ordersToCreate.push({
        userId: `user_seed_${randomInt(1, 3)}`,
        products: items,
        totalAmount: Number(totalAmount.toFixed(2)),
        // ✅ KLJUČNO: unique stripeSessionId da ne puca index
        stripeSessionId: makeStripeId(i),
        createdAt,
        updatedAt: createdAt,
      });
    }

    await Order.insertMany(ordersToCreate);
    console.log("Seeded orders for this month ✅📦");

    // ✅ mali log da vidiš odmah top5 u terminalu (opciono)
    const startMonth = start;
    const top5 = await Order.aggregate([
      { $match: { createdAt: { $gte: startMonth, $lt: end } } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$product._id",
          name: "$product.name",
          totalQuantity: 1,
        },
      },
    ]);

    console.log("Top 5 (this month):");
    console.table(top5);

    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seedOrdersThisMonth();