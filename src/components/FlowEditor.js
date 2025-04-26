import { 
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react'; 

import '@xyflow/react/dist/style.css';

import { useState } from 'react';

const FlowEditor = ({ nodes, setNodes, edges, setEdges }) => {
  const [selectedElements, setSelectedElements] = useState([]);

  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (connection) => {
    setEdges((eds) => addEdge(connection, eds));
  };

  const onSelectionChange = ({ nodes, edges }) => {
    const newSelection = ([...nodes, ...edges]);
    if (newSelection.length !== selectedElements.length ||
      !newSelection.every((el, idx) => el.id === selectedElements[idx]?.id)) {
    setSelectedElements(newSelection);
    }
  };

  const handleDelete = () => {
    const selectedIds = new Set(selectedElements.map(el => el.id));
    setNodes((nds) => nds.filter((node) => !selectedIds.has(node.id)));
    setEdges((eds) => eds.filter((edge) => !selectedIds.has(edge.id)));
    setSelectedElements([]);
  };

  return (
    <div className="relative flex-1 p-4 border-l" style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        fitView
      />

      {selectedElements.length > 0 && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
        >
          Delete Selected
        </button>
      )}
    </div>
  );
};

export default FlowEditor;