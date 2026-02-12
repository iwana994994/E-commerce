
import ProductList from "../ProductList"
const AdminNavbar = () => {
  return (
    <nav className="flex flex-col w-64 h-screen bg-black text-white p-6 gap-6">
      
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <a href="/admin-dashboard" className="hover:text-accent transition">
      Dashboard
      </a>


      <a href="/admin/product-list" className="hover:text-accent transition">
        Products
      </a>

      <a href="/admin/order-list" className="hover:text-accent transition">
        Orders
      </a>

      <a href="/" className="mt-auto hover:text-accent transition">
        Back to Shop
      </a>

    </nav>
  )
}


export default AdminNavbar