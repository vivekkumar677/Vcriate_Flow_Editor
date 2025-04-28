import React, { useState, useEffect } from 'react';

const ProductList = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      setProducts(data.products);
    }
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h2>Products List</h2>
      {products.map((product) => (
        <div
          key={product.id}
          className="product-item"
          onClick={() => onProductClick(product)}
          style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}
        >
          <strong>{product.title}</strong> - ${product.price}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
