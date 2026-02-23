import Product from "../models/Product.js";
import "../models/Category.js";
import Category from "../models/Category.js";
import cloudinary from "../lib/cloudinary.js";


export const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock,lowStockThreshold, sale } = req.body;

    if (!name || price === undefined || !category || !req.file) {
      return res.status(400).json({ error: "All fields are required (including image)." });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) return res.status(404).json({ error: "Category not found." });

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ error: "Price must be valid." });
    }
    const numericStock=stock === undefined || stock === null ? 0 : Number(stock)
    if(Number.isNaN(numericStock)||numericStock < 0)
    {
      return res.status(400).json({error:"Stock must be valid and larger than 0"})
    }
   const numericLowStock = lowStockThreshold === undefined 
   || lowStockThreshold === null
  ? 2
  : Number(lowStockThreshold);

if (Number.isNaN(numericLowStock) || numericLowStock < 0) {
  return res.status(400).json({ error: "lowStockThreshold must be a valid non-negative number" });
}

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

 // sale normalize (optional)
    let normalizedSale = { enabled: false, type: "PERCENT", value: 0, startAt: null, endAt: null };
    if (sale) {
      const parsedSale = typeof sale === "string" ? JSON.parse(sale) : sale;
      normalizedSale = {
        enabled: Boolean(parsedSale.enabled),
        type: parsedSale.type || "PERCENT",
        value: parsedSale.value != null ? Number(parsedSale.value) : 0,
        startAt: parsedSale.startAt ? new Date(parsedSale.startAt) : null,
        endAt: parsedSale.endAt ? new Date(parsedSale.endAt) : null,
      };
    }


    const product = await Product.create({
      name,
      price: numericPrice,
      image: uploadResult.secure_url,
      category,
      stock:numericStock,
      lowStockThreshold:numericLowStock,
      sale:normalizedSale
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
    const products = await Product.find().populate("category", "name").sort({createdAt:-1});
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
