import Category from "../models/Category.js"
export const createCategory = async(req,res) =>{}

export const getAllCategories = async(req,res) =>{
    try {
        const categories = await Category.find()
        res.status(201).json({categories})
        
    } catch (error) {
        res.status(500).json({message:"Problem with fetching Categories"})
    }
}

export const deleteCategory = async(req,res) =>{}