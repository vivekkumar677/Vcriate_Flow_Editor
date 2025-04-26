import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products"
        );
        setProducts(response.data.products);
        console.log("Products:", response.data.products);
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };    
    fetchProducts();
  }, []); 

  return (
    <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold">Select a Product</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-2 border rounded cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectProduct(product)}
          >
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-500">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
