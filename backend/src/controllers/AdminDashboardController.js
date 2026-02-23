import Product from "../models/Product.js"
export const Insights = async(req,res)=>{
    try {
    
        const totalProduct= await Product.countDocuments();
        const productsOnSale = await Product.countDocuments({ "sale.enabled": true });
        const lowStockButNotZero = await Product.countDocuments({$expr: { $and: [
                        { $lte: ["$stock", "$lowStockThreshold"] },
                      { $gt: ["$stock", 0] }, ],}
                    });
        const outOfStockTotal= await Product.countDocuments({stock:0});

       res.status(200).json({
  totalProduct,
  productsOnSale,
  lowStockButNotZero,
  outOfStockTotal,
});
    } catch (error) {
       res.status(500).json({ error: error.message })
    }
}