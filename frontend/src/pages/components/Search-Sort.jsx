import { useState, useEffect } from "react";
import { useProduct } from "../../store/useProduct";
import { SortAscIcon, SortDescIcon } from "lucide-react";


const SearchSort = () => {
  const {getAllProducts } = useProduct();
 
   const [search, setSearch] = useState("");
   const [sort, setSort] = useState("");
 
  
 
   const applyFilters = () => {
     getAllProducts({search,sort});
   };
 
   useEffect(() => {
     applyFilters();
   }, []);
 
   return (
    <>
    <div>
      
     <div className="flex gap-2">
       <input
         type="text"
         placeholder="Search..."
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         className="border border-gray-300 rounded-md px-2 py-1"
       />
 
       
 
       <button onClick={applyFilters}
        className="bg-accent hover:bg-accent-focus text-white font-bold py-2 px-4 rounded-2xl">
         Search
         </button>
 
 
     </div>

  
      
     <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 w-fit">
  {sort === "asc" ? <SortAscIcon /> : <SortDescIcon />}

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="bg-base-100"
  >
    <option value="asc">Low price to high</option>
    <option value="desc">High price to low</option>
  </select>
</div>
       
     </div>
     
     
     </>
   );
}

export default SearchSort