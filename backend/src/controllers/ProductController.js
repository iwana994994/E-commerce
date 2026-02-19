import Product from "../models/Product.js";
import "../models/Category.js";
import Category from "../models/Category.js";
import cloudinary from "../lib/cloudinary.js";


export const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!name || price === undefined || !category || !req.file) {
      return res.status(400).json({ error: "All fields are required (including image)." });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) return res.status(404).json({ error: "Category not found." });

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ error: "Price must be valid." });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const product = await Product.create({
      name,
      price: numericPrice,
      image: uploadResult.secure_url,
      category,
    });

    const populated = await Product.findById(product._id).populate("category", "name");
    return res.status(201).json({ product: populated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(201).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteProduct = async(req,res) =>{
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // šta menjamo (dolazi iz frontenda)
    const { name, image, price, category } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, image, price, category },
      { new: true, runValidators: true }
    ).populate("category", "name");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
