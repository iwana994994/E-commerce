import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
       group:{
        type:String,
        required:false,
         enum: ["food", "toys", "accessories"],
       },
       isActive:{
       type:Boolean,
       required:true,
        default:true
       }
    },
    { timestamps: true } // createdAt, updatedAt
);

const Category = mongoose.model("Category", categorySchema);

export default Category;