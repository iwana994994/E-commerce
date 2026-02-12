import Product from "../models/Product.js";
import "../models/Category.js";
import Category from "../models/Category.js";
import cloudinary from "../lib/cloudinary.js";


export const createProduct = async (req, res) => {

  console.log("BODY:", {
  name: req.body?.name,
  price: req.body?.price,
  category: req.body?.category,
  imageType: typeof req.body?.image,
  imageLen: req.body?.image?.length,
});
  try {
    const { name, price, image, category } = req.body;

    // 1) validacija
    if (!name || price === undefined || !image || !category) {
      return res.status(400).json({ error: "All fields are required." });
    }
    let cloudinaryResponse=null
    if(image){
      cloudinaryResponse= await cloudinary.uploader.upload(image,{folder:"products"})
    }



    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ error: "Price must be a valid non-negative number." });
    }

    // 2) provera kategorije (da ne upišeš random id)
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    // 3) kreiranje proizvoda
    const product = await Product.create({
      name,
      price: numericPrice,
      image:cloudinaryResponse?.secure_url?cloudinaryResponse?.secure_url:"",
      category,
    });

    // 4) vrati proizvod sa populate da front odmah ima category.name
    const populated = await Product.findById(product._id).populate("category", "name");

    return res.status(201).json({ product: populated });
  } catch (err) {
    console.error("createProduct error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json({ products });
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
