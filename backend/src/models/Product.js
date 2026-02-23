import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    lowStockThreshold: {
        type: Number,
        required: true,
        default: 2,
    },
   sale: {
  enabled: { type: Boolean, default: false },
  type: { type: String, enum: ["PERCENT", "FIXED"], default: "PERCENT" },
  value: { type: Number, default: 0, min:0 },
  startAt: { type: Date, default: null },
  endAt: { type: Date, default: null },
}



},{timestamps:true})

const Product = mongoose.model("Product",productSchema)

export default Product