import { Outlet } from "react-router-dom"
import Navigation from "../pages/components/Navigation"

const ShopLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

export default ShopLayout