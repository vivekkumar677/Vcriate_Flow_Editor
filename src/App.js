import { useState, useCallback } from 'react';
import { ReactFlowProvider } from 'reactflow';
import ProductList from './components/ProductList';
import FlowEditor from './components/FlowEditor';
import 'reactflow/dist/style.css';
import './App.css';

const App = () => {
  
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const addProductAsNode = useCallback((product) => {
    const newNode = {
      id: idCounter.toString(),
      type: 'default',
      data: { label: `${product.title} (${product.price})` },
      position: { x: Math.random() * 500, y: Math.random() * 400 },
      draggable: true,
    };
    setNodes((nds) => [...nds, newNode]);
    setIdCounter((id) => id + 1);
  }, [idCounter]);
  
  return (
    <div className="app">
      <ProductList onProductClick={addProductAsNode} />
      <div className="flow-editor">
        <ReactFlowProvider>
          <FlowEditor nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default App;
