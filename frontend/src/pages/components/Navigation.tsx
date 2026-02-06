import { SignedOut, SignInButton,UserButton,SignedIn } from "@clerk/clerk-react"
import { ArrowRightIcon, SparklesIcon } from "lucide-react"
import { Link } from "react-router-dom"





const Navigation = () => {


  return (
    <nav className="w-full border-b border-black ">
      <div className="mx-auto flex items-center justify-between px-4 py-3">
        {/*LEFT SIDE */}
        <div>
        <Link to="/" className="flex items-center gap-2 rounded-full px-3 py-2 hover:bg-base-200">
          <SparklesIcon size={28} />
          <span className="text-2xl text-base-content font-bold">Interview App</span>
        </Link>

 {/*RIGHT SIDE */}
        </div>
        <div className="flex items-center justify-between gap-6">
     
              <SignedOut>
         <SignInButton mode="modal">
          <div className="flex justify-between items-center rounded-2xl bg-accent p-2 gap-2 hover:bg-accent-hover cursor-pointer">
            <span className="text-white">Sing in</span>
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
