import {Link} from "react-router-dom"
import {useState} from "react"
const AdminNavbar = () => {

  const [open, setOpen] = useState(false);
  return (
    <nav className="flex flex-col w-64 h-screen bg-black text-white p-6 gap-6">
      
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <a href="/admin-dashboard" className="hover:text-accent transition border-b ">
      Dashboard
      </a>


      <a href="/admin/product-list" className="hover:text-accent transition  border-b">
        Products
      </a>

      <a href="/admin/order-list" className="hover:text-accent transition  border-b">
        Orders
      </a>
      <ul className="space-y-2">
  <li>
  <Link
    to="/admin/insights"
    className="hover:text-accent transition border-b"
    onClick={(e) => {
      e.preventDefault();     // da ne navigira (samo toggle)
      setOpen((v) => !v);
    }}
  >
    Insights
  </Link>

  <ul className={`pl-4 ml-4 mt-2 space-y-2  rounded-2xl text-sm ${open ? "block" : "hidden"}`}>
    <li>
      <Link to="/admin/insights/inventory" className="hover:text-accent transition">
        Inventory Insights
      </Link>
    </li>
    <li>
      <Link to="/admin/insights/sales" className="hover:text-accent transition">
        Sales Insights
      </Link>
    </li>
    <li>
      <Link to="/admin/insights/actions" className="hover:text-accent transition">
        Action needed
      </Link>
    </li>
  </ul>
</li>
</ul>

      <a href="/" className="mt-auto hover:text-accent transition">
        Back to Shop
      </a>

    </nav>
  )
}


export default AdminNavbar