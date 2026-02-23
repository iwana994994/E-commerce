
import { useEffect } from 'react'
import { useProduct } from '../../../store/useProduct'

const InventoryInsights = () => {
  const {totalProduct,productsOnSale,lowStockButNotZero,outOfStockTotal,getInsights} =useProduct()

  useEffect(()=>{getInsights()},[])


  return (
  <div className="w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
        <p className="text-sm text-white/60">Total Products</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-3xl font-bold">{totalProduct}</p>
          <span className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">
            All
          </span>
        </div>
      </div>

      {/* On Sale */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
        <p className="text-sm text-white/60">Products on sale</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-3xl font-bold">{productsOnSale}</p>
          <span className="text-xs px-2 py-1 rounded-full border border-emerald-400/20 bg-emerald-500/10 text-emerald-300">
            SALE
          </span>
        </div>
      </div>

      {/* Low Stock */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
        <p className="text-sm text-white/60">Low stock</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-3xl font-bold">{lowStockButNotZero}</p>
          <span className="text-xs px-2 py-1 rounded-full border border-amber-400/20 bg-amber-500/10 text-amber-300">
            LOW
          </span>
        </div>
      </div>

      {/* Out of Stock */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
        <p className="text-sm text-white/60">Out of stock</p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-3xl font-bold">{outOfStockTotal}</p>
          <span className="text-xs px-2 py-1 rounded-full border border-red-400/20 bg-red-500/10 text-red-300">
            OUT
          </span>
        </div>
      </div>
    </div>
  </div>
);
}

export default InventoryInsights