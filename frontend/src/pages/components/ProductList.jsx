import { useEffect, useState } from "react";
import { useProduct } from "../../store/useProduct";
import { useCategory } from "../../store/useCategory";
import CreateProduct from "./CreateProduct";


const ProductList = () => {
  const { getAllProducts, products, editProduct,deleteProduct } = useProduct();
  const{getAllCategories,categories}=useCategory()


{/*FILTER */}

const [filter,setFilter]= useState("ALL")


  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // novo stanje za praćenje kreiranja
  const [form, setForm] = useState({
    _id: "",
    name: "",
    price: "",
    image: "",
    category: "",
    stock: 0,
  lowStockThreshold: 2,
  sale: {
    enabled: false,
    type: "PERCENT", 
    value: 0,
    startAt: "",
    endAt: "",
  },
  });

  useEffect(() => {
    getAllProducts();
   
    getAllCategories()
  }, []);

{/*filter */}
const filteredProducts = (products ?? []).filter((p) => {
  if (filter === "SALE") return p.sale?.enabled;
  if (filter === "LOW") return (p.stock ?? 0) <= (p.lowStockThreshold ?? 2);
  return true;
});

  const handleCreateProduct = () => {
    setIsCreating(true);
   
  }

  const handleOpenEdit = (product) => {
    setForm({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category?._id || product.category, 
         stock: product.stock ?? 0,
    lowStockThreshold: product.lowStockThreshold ?? 2,
    sale: {
      enabled: !!product.sale?.enabled,
      type: product.sale?.type || "PERCENT",
      value: product.sale?.value ?? 0,
      startAt: product.sale?.startAt ? product.sale.startAt.slice(0, 10) : "",
      endAt: product.sale?.endAt ? product.sale.endAt.slice(0, 10) : "",
    },
    });
    setOpen(true);
  };

  const handleSave = async () => {
    await editProduct(form._id, {
      name: form.name,
      price: Number(form.price),
      image: form.image,
      category: form.category,
    });
    setOpen(false);
  };

  
  return (
    <div className="p-6">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Products</h1>



    <button onClick={()=>{handleCreateProduct()}} className="px-4 py-2 rounded-xl bg-accent text-white hover:scale-105 transition">
      Create Product
    </button>

    </div>

      <div className="overflow-x-auto">

<div className="flex-col gap-2 mb-4 ">
  <div>
     <p className="font-bold text-sm">Filter for products</p>
  </div>
 <div>
  <button onClick={() => setFilter("ALL")} className={filter==="ALL" ? "btn btn-accent" : "btn btn-ghost"}>All</button>
  <button onClick={() => setFilter("SALE")} className={filter==="SALE" ? "btn btn-accent" : "btn btn-ghost"}>On sale</button>
  <button onClick={() => setFilter("LOW")} className={filter==="LOW" ? "btn btn-accent" : "btn btn-ghost"}>Low stock</button>
  </div>
</div>
        <table className="min-w-full rounded-xl overflow-hidden">
          <thead className="text-left">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4">On Stock</th>
              <th className="p-4">Sales</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products && products.length > 0 ? (filteredProducts.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                </td>

                <td className="p-4 font-semibold">{product.name}</td>
                <td className="p-4">{product.price} €</td>
                <td className="p-4">{product.category?.name}</td>
              <td className="p-4">{product.stock ?? 0}</td>
               <td className="p-4">{product.sale?.enabled ? "✅ On" : "—"}</td>
                <td className="p-4">
                  {/* ✅ OVDE implementiraš Edit */}
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </button>

                  <button onClick={()=>deleteProduct(product._id)} className="text-blue-500 hover:underline mr-4">
                    Delete
                    </button>
                </td>
              </tr>
            ))):(
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-zinc-900 p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-4">Edit product</h2>

            <div className="space-y-3">
              <input
                className="w-full rounded-xl p-3 bg-white/10 border border-white/10"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
              />

              <input
                className="w-full rounded-xl p-3 bg-white/10 border border-white/10"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Price"
              />

              <input
                className="w-full rounded-xl p-3 bg-white/10 border border-white/10"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="Image URL"
              />

           <select className="w-full rounded-xl p-3 bg-gray-800 border text-gray-200"
             value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
      

                 {categories.map((cat) => (
                     <option key={cat._id} value={cat._id} >
                           {cat.name}
        </option>
          ))}
           </select>
           <div className="mt-4 rounded-xl border border-white/10 p-4 bg-white/5">
  <div className="flex items-center justify-between">
    <span className="font-semibold">On Sale</span>

    <button
      type="button"
      onClick={() =>
        setForm((prev) => ({
          ...prev,
          sale: { ...prev.sale, enabled: !prev.sale.enabled },
        }))
      }
      className={`w-12 h-7 rounded-full relative transition ${
        form.sale.enabled ? "bg-green-500" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition ${
          form.sale.enabled ? "translate-x-5" : ""
        }`}
      />
    </button>
  </div>

  {form.sale.enabled && (
    <div className="mt-4 space-y-3 ">
      <select
        className="w-full rounded-xl p-3 bg-gray-800 border text-gray-200 "
        value={form.sale.type}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            sale: { ...prev.sale, type: e.target.value },
          }))
        }
      >
        <option value="PERCENT">Percent (%)</option>
      
      </select>

      <input
        type="number"
        className="w-full rounded-xl p-3 bg-white/10 border border-white/10 "
        value={form.sale.value}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            sale: { ...prev.sale, value: e.target.value },
          }))
        }
        placeholder="Discount value"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="date"
          className="w-full rounded-xl p-3 bg-white/10 border border-white/10"
          value={form.sale.startAt}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              sale: { ...prev.sale, startAt: e.target.value },
            }))
          }
        />
        <input
          type="date"
          className="w-full rounded-xl p-3 bg-white/10 border border-white/10"
          value={form.sale.endAt}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              sale: { ...prev.sale, endAt: e.target.value },
            }))
          }
        />
      </div>
    </div>
  )}
</div>

            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-xl border border-white/20 hover:scale-105 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-accent text-white font-semibold hover:scale-105 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isCreating && (
  <CreateProduct
    categories={categories}
    onClose={() => setIsCreating(false)}
    onCreated={() => {
      setIsCreating(false);
      getAllProducts(); // refresh tabela
    }}
  />
)}

    </div>
   
  );
};

export default ProductList;
