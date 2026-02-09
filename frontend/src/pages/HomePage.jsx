import { useEffect } from "react";
import { useProduct } from "../store/useProduct";
import { Link } from "react-router-dom";
import { useCart } from "../store/useCart";

const HomePage = () => {
  const { getAllProducts, products } = useProduct();
  const { addToCart } = useCart();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="px-4 py-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition overflow-hidden"
          >
            {/* Klikabilan deo (Link) */}
            <Link to={`/product/${product._id}`} className="block">
              <div className="flex justify-center p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-44 h-44 object-cover rounded-xl"
                />
              </div>

              <div className="px-2 pb-2">
                <p className="text-center font-semibold truncate">
                  {product.name}
                </p>

                <p className="text-center text-lg font-bold text-white mt-2">
                  {product.price} €
                </p>
              </div>
            </Link>

            {/* Dugme van Link-a */}
            <div className="px-2 pb-4">
              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full rounded-xl bg-accent hover:scale-105 transition text-white font-semibold py-2"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
