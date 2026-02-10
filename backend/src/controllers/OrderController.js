import Product from "../models/Product.js";
import { stripe } from "../lib/stripe.js"; 
import Order from "../models/Order.js";


export const createOrder = async (req, res) => {
  try {
   const { userId } = req.auth();

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid or empty products array" });
    }

    // 1) Učitaj prave proizvode iz baze
    const ids = products.map((p) => p.productId);
    const dbProducts = await Product.find({ _id: { $in: ids } });

    // mapa radi lakšeg lookup-a
    const mapById = new Map(dbProducts.map((p) => [p._id.toString(), p]));

    let totalAmount = 0;

    // 2) Napravi Stripe line items iz DB podataka
    const lineItems = products.map((p) => {
      const prod = mapById.get(p.productId);
      if (!prod) throw new Error(`Product not found: ${p.productId}`);

      const qty = Math.max(1, Number(p.quantity || 1));
      const unitAmount = Math.round(prod.price * 100);

      totalAmount += unitAmount * qty;

      return {
        price_data: {
          currency: "eur", 
          product_data: {
            name: prod.name,
            images: prod.image?.startsWith("http") ? [prod.image] : [], // Stripe traži public URL
          },
          unit_amount: unitAmount,
        },
        quantity: qty,
      };
    });

    // 3) Kreiraj session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      metadata: {
        userId,
        products: JSON.stringify(
          products.map((p) => ({
            id: p.productId,
            quantity: p.quantity,
          }))
        ),
      },
    });

    res.status(200).json({ url: session.url, id: session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({ message: "Error processing checkout", error: error.message });
  }
};





export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ message: "Session ID missing" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // ✅ spreči dupliranje
    const existing = await Order.findOne({ stripeSessionId: sessionId });
    if (existing) {
      return res.status(200).json({ success: true, orderId: existing._id });
    }

    // metadata.products: [{ id, quantity }]
    const rawProducts = JSON.parse(session.metadata.products);
    console.log("METADATA PRODUCTS:", rawProducts);

    const ids = rawProducts.map(p => p.id);
    const dbProducts = await Product.find({ _id: { $in: ids } });

    const mapById = new Map(dbProducts.map(p => [p._id.toString(), p]));

    const orderProducts = rawProducts.map((p) => {
      const db = mapById.get(p.id);
      if (!db) throw new Error(`Product not found in DB: ${p.id}`);

      return {
        product: p.id,
        quantity: Number(p.quantity) || 1,
        price: db.price, // ✅ cena iz baze
      };
    });

    const newOrder = new Order({
      userId: session.metadata.userId, // Clerk userId
      products: orderProducts,
      totalAmount: session.amount_total / 100,
      stripeSessionId: sessionId,
      status: "paid",
    });

    await newOrder.save();

    await Cart.findOneAndDelete({ userId: session.metadata.userId });

    return res.status(200).json({
      success: true,
      message: "Order created",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Checkout success error:", error);
    return res.status(500).json({ message: error.message });
  }
};

