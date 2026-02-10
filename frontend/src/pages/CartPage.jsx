
import { useCart } from "../store/useCart.js";



const CartPage = () => {
  const cart = useCart((s) => s.cart);
const checkout = useCart((s) => s.checkout);

const removeFromCart = useCart((s) => s.removeFromCart);

const handleCheckout = async () => {
  try {
    const data = await checkout(); // { url }

    if (!data?.url) {
      console.log("Checkout response:", data);
      alert("Nema Stripe URL. Proveri backend response.");
      return;
    }

    window.location.href = data.url; // ✅ ide na Stripe checkout
  } catch (err) {
    console.error(err);
    alert("Checkout failed");
  }
};
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-xl"
              />

              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">
                  {item.product.price} € × {item.quantity}
                </p>
              </div>
            </div>
             <div className="flex items-center justify-between gap-2">
            <p className="font-bold">
              {item.product.price * item.quantity} €
            </p>
             <button
      onClick={()=>removeFromCart(item.product._id)}
      className=" text-white px-3 py-1 rounded-full border border-white cursor-pointer hover:tr hover:scale-105"
    >
      X
    </button>

     
          </div>
          </div>
        ))
      )}
      <div className="flex justify-end mt-6">

        {/**Ako ima nesto ti prikazi , ako nema nista nemoj nista ni da prikazujes */}
     {cart.length > 0 && (
  <div className="flex justify-end mt-6">
    <button
      onClick={handleCheckout}
      className="rounded-xl bg-accent text-white font-semibold p-6 hover:scale-105 transition"
    >
      BUY
    </button>
  </div>
)}
        </div>
    </div>
  );
};

export default CartPage;
