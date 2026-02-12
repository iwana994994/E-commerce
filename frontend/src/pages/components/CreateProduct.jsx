import { useState } from "react";


import { useProduct } from "../../store/useProduct";

const CreateProduct = ({ categories = [], onClose, onCreated }) => {

  
  const { createProduct } = useProduct();

  

  const [loading, setLoading] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "", // ✅ base64 string koji šaljemo backendu
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct((prev) => ({ ...prev, image: reader.result })); // ✅ data:image/...;base64,...
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validacija
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.image) {
      alert("Fill all fields (including image).");
      return;
    }

    setLoading(true);
    try {
      await createProduct({
        name: newProduct.name,
        price: Number(newProduct.price),
        category: newProduct.category, // ✅ categoryId
        image: newProduct.image,       // ✅ base64 string
      });

      // reset form
      setNewProduct({ name: "", price: "", category: "", image: "" });

      onCreated?.(); // zatvori + refresh lista
    } catch (err) {
      console.log("error creating a product", err);
      alert(err?.response?.data?.error || err.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-xl w-full" >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-emerald-300">Create New Product</h2>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg border border-white/20 text-gray-200 hover:scale-105 transition"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300">
              Price
            </label>
            <input
              type="number"
              id="price"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">
              Category
            </label>

            <select
              id="category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              <option value="">Select a category</option>

              {(categories ?? []).map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-1 flex items-center">
            <input type="file" id="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
            <label
              htmlFor="image"
              className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
        
              Upload Image
            </label>

            {newProduct.image && <span className="ml-3 text-sm text-gray-400">Image uploaded</span>}
          </div>

          {/* Preview (opciono, ali korisno) */}
          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-600"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
              bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          >
            {loading ? (
              <>
            
                Loading...
              </>
            ) : (
              <>
             
                Create Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
