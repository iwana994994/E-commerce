import { useState, useEffect } from "react";
import { useProduct } from "../../store/useProduct";
import { useCategory } from "../../store/useCategory";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const ProductFilters = () => {
  const {getAllProducts } = useProduct();
  const { categories, getAllCategories } = useCategory();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([1,2000]);

 

  const applyFilters = () => {
    getAllProducts({search, category,
       minPrice: price[0],
       maxPrice: price[1],
    });
  };

  useEffect(() => {
    applyFilters();
    getAllCategories();
  }, []);

  return (

    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1"
      />

    <label >Category:</label>
      <select
      
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-md px-2 py-1 bg-base-100"
      >
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
     
       <Box sx={{ width: 300 }}>
      <label>
        Price: {price[0]} - {price[1]}
      </label>

      <Slider
        value={price}
        onChange={(event, newValue) => setPrice(newValue)}
        valueLabelDisplay="auto"
        min={1}
        max={2000}
        step={10}
      />
    </Box>

      <button onClick={applyFilters}
       className="bg-accent hover:bg-accent-focus text-white font-bold py-2 px-4 rounded-2xl">
        Search
        </button>


    </div>
  );
};

export default ProductFilters;