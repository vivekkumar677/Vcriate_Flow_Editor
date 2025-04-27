import { useEffect, useState, useCallback } from 'react';
import { ReactFlowProvider } from 'reactflow';
import ProductList from './components/ProductList';
import FlowEditor from './components/FlowEditor';
import 'reactflow/dist/style.css';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      setProducts(data.products);
    }
    fetchProducts();
  }, []);

  const addProductAsNode = useCallback((product) => {
    const newNode = {
      id: idCounter.toString(),
      type: 'default',
      data: { label: `${product.title} ($${product.price})` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      draggable: true,
    };
    setNodes((nds) => nds.concat(newNode));
    setIdCounter((id) => id + 1);
  }, [idCounter]);
  

  return (
    <div className="app">
      <div className="product-list">
        <h2>Products List</h2>
        <ProductList products={products} onProductClick={addProductAsNode} />
      </div>

      <div className="flow-editor">
        <ReactFlowProvider>
          <FlowEditor nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default App;
