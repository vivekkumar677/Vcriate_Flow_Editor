const ProductList = ({ products, onProductClick }) => {

  return (
    <div className="product-list">
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
