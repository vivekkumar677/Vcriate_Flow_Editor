import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: { label: 'Start Node' },
    position: { x: 250, y: 5 },
  },
];

const initialEdges = [];

function FlowEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  // Handle connecting two nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // Handle selecting a node
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Handle key press for deletion
  const onKeyDown = useCallback((event) => {
    if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
      setSelectedNode(null);
    }
  }, [selectedNode]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default FlowEditor;