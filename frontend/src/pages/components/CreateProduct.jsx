import { useState } from "react";
import { useProduct } from "../../store/useProduct";

const DEFAULT_PRODUCT = {
  name: "",
  price: "",
  category: "",
  image: null, // File
  stock: 0,
  lowStockThreshold: 2,
  sale: {
    enabled: false,
    type: "PERCENT",
    value: 0,
    startAt: "",
    endAt: "",
  },
};

const CreateProduct = ({ categories = [], onClose, onCreated }) => {
  const { createProduct } = useProduct();
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState(DEFAULT_PRODUCT);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewProduct((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.image) {
      alert("Fill all fields (including image).");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("name", newProduct.name);
      form.append("price", String(newProduct.price));
      form.append("category", newProduct.category);
      form.append("image", newProduct.image);

      form.append("stock", String(newProduct.stock));
      form.append("lowStockThreshold", String(newProduct.lowStockThreshold));

      // ✅ IMPORTANT: send full sale object as JSON string
      form.append("sale", JSON.stringify(newProduct.sale));

      await createProduct(form);

      setNewProduct(DEFAULT_PRODUCT);
      onCreated?.();
    } catch (err) {
      console.log("error creating a product", err);
      alert(err?.response?.data?.error || err.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto">
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
          {/* NAME */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          {/* PRICE */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300">
              Price
            </label>
            <input
              type="number"
              id="price"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              id="category"
              value={newProduct.category}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))}
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

          {/* STOCK */}
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-300">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              min="0"
              value={newProduct.stock}
              onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: e.target.value }))}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
            />
          </div>

          {/* LOW STOCK THRESHOLD */}
          <div>
            <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-300">
              Low Stock Threshold
            </label>
            <input
              type="number"
              id="lowStockThreshold"
              min="0"
              value={newProduct.lowStockThreshold}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, lowStockThreshold: e.target.value }))
              }
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
            />
          </div>

          {/* SALE TOGGLE + DETAILS */}
          <div className="rounded-lg border border-white/10 p-4 bg-gray-700/30">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">On Sale</label>
              <input
                type="checkbox"
                className="toggle"
                checked={newProduct.sale.enabled}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    sale: { ...prev.sale, enabled: e.target.checked },
                  }))
                }
              />
            </div>

            {newProduct.sale.enabled && (
              <div className="mt-4 space-y-3">
                <select
                  value={newProduct.sale.type}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      sale: { ...prev.sale, type: e.target.value },
                    }))
                  }
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                >
                  <option value="PERCENT">Percent (%)</option>
                  <option value="FIXED">Fixed (€)</option>
                </select>

                <input
                  type="number"
                  min="0"
                  value={newProduct.sale.value}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      sale: { ...prev.sale, value: e.target.value },
                    }))
                  }
                  className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  placeholder={newProduct.sale.type === "PERCENT" ? "Discount percent" : "Discount amount"}
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={newProduct.sale.startAt}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        sale: { ...prev.sale, startAt: e.target.value },
                      }))
                    }
                    className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  />
                  <input
                    type="date"
                    value={newProduct.sale.endAt}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        sale: { ...prev.sale, endAt: e.target.value },
                      }))
                    }
                    className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* IMAGE */}
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Upload Image
            </label>

            {newProduct.image && <span className="ml-3 text-sm text-gray-400">Image selected</span>}
          </div>

          {newProduct.image && (
            <img
              src={URL.createObjectURL(newProduct.image)}
              alt="preview"
              className="w-24 h-24 object-cover rounded-lg border border-gray-600"
            />
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
              bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;