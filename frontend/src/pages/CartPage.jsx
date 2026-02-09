import { useCart } from "../store/useCart.js";


const CartPage = () => {
  const cart = useCart((s) => s.cart);

  const {removeFromCart} = useCart();


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl"
              />

              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">
                  {item.price} € × {item.quantity}
                </p>
              </div>
            </div>

            <p className="font-bold">
              {item.price * item.quantity} €
            </p>
             <button
      onClick={() => removeFromCart(item._id)}
      className=" text-white px-3 py-1 rounded-full border border-white cursor-pointer hover:tr hover:scale-105"
    >
      X
    </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
