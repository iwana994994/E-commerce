import { useEffect, useState } from "react";
import { useProduct } from "../../store/useProduct";
import { useCategory } from "../../store/useCategory";
import CreateProduct from "./CreateProduct";


const ProductList = () => {
  const { getAllProducts, products, editProduct,deleteProduct } = useProduct();
  const{getAllCategories,categories}=useCategory()

  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // novo stanje za praćenje kreiranja
  const [form, setForm] = useState({
    _id: "",
    name: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    getAllProducts();
   
    getAllCategories()
  }, []);

  const handleCreateProduct = () => {
    setIsCreating(true);
   
  }

  const handleOpenEdit = (product) => {
    setForm({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category?._id || product.category, // ako je populate ili nije
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
        <table className="min-w-full rounded-xl overflow-hidden">
          <thead className="text-left">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products && products.length > 0 ? (products.map((product) => (
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
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
