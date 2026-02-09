import { SignedOut, SignInButton,UserButton,SignedIn } from "@clerk/clerk-react"
import { ArrowRightIcon, ShoppingBasketIcon} from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../../store/useCart"





const Navigation = () => {
  const cart = useCart((s) => s.cart);

  // broj svih komada (quantity)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="w-full border-b border-black ">
      <div className=" flex items-center justify-between">
        {/*LEFT SIDE */}
        <div>
        <Link to="/" className="flex items-center hover:transform hover:scale-105">
          <img src="/Cat-logo.png" alt="logo" className="w-50 h-35 pt-3" />
          
        </Link>
        

 {/*RIGHT SIDE */}
        </div>
        <div className="flex items-center justify-between gap-6 mr-6">
           <Link to={"/cart"} className="relative inline-block">
           
            {totalItems > 0 && (
        <span className=" absolute -top-4.5 -left-4 bg-rose-500 text-white text-xs font-bold rounded-full p-2">
          {totalItems}
        </span>
      )}
      <ShoppingBasketIcon size={30} className="text-accent"/>
           </Link>
     
              <SignedOut>
         <SignInButton mode="modal">
          <div className="flex justify-between items-center rounded-2xl bg-accent p-2 gap-2 hover:transform hover:scale-105 hover:bg-accent-content cursor-pointer">
            <span className="text-white ">Sing in</span>
            <ArrowRightIcon size={18} className="text-white" />
            </div>
        </SignInButton>
      
      </SignedOut>
    
      <SignedIn>
        <UserButton />
      </SignedIn>
      
</div>
      </div>
    </nav>
  )
}

export default Navigation
