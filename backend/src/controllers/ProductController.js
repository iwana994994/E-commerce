import Product from "../models/Product.js";
export const createProduct = async(req,res) =>{}

export const getAllProducts = async(req,res) =>{
    try {
        const products = await Product.find()
        res.status(200).json({products})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const deleteProduct = async(req,res) =>{}