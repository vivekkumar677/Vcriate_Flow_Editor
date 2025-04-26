import React, { useState } from 'react';
import ProductList from './components/ProductList';
import FlowEditor from './components/FlowEditor';

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleSelectProduct = (product) => {
    const newNode = {
      id: `${product.id}`,
      type: 'customNode',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { name: product.name, price: product.price },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className="flex h-screen">
      <ProductList onSelectProduct={handleSelectProduct} />
      <FlowEditor nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
    </div>
  );
};

export default App;

