import { Code2Icon, CodeIcon, DatabaseIcon, ZapIcon } from "lucide-react"
import Navigation from "./components/Navigation"

const HomePage = () => {
  return (
   <>

   <div className="w-full flex items-center justify-between"> 
      {/* Left side*/}
   <div className="flex flex-col ml-6 pl-6 gap-4 w-full">
    <div className=" flex items-center gap-2 bg-accent rounded-2xl p-2 m-4 w-1/2 pl-9 ">
      <ZapIcon className="text-white"/>
        <span className="text-white">Opportunity for you</span>
    </div>
    <div className="mt-6 mb-6 ml-6">
      <h1 className="bg-accent bg-clip-text text-transparent font-black text-3xl ">INTERVIEW PRACTICE</h1>
    </div>

    <div className="flex justify-baseline items-center gap-6 mt-6">
      <div className="flex items-center justify-between gap-2 text-2xl bg-accent rounded-2xl p-4 hover:bg-accent-content">
        <Code2Icon/>
        <h1>REACT</h1>
      </div>
      <div className="flex items-center justify-between gap-2 text-2xl bg-accent rounded-2xl p-4 hover:bg-accent-content">
      <CodeIcon/>
      <h1>NODE.JS</h1></div>
      <div className="flex items-center justify-between gap-2 text-2xl bg-accent rounded-2xl p-4 hover:bg-accent-content">
        <DatabaseIcon/>
        <h1>MONGO DB</h1>
        </div>
    </div>

   </div>
   {/* Right Side */}
   <div className="w-full h-full m-6 tr-6">
 <img src="../../public/homePage.png" alt="hello" />
   </div>
   
</div>


</>
  )
}

export default HomePage