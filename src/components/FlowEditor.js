
import ReactFlow, { addEdge, MiniMap, Controls, Background, useReactFlow } from 'reactflow';
import { useCallback } from 'react';
import Node from './Node';

export default function FlowEditor({ nodes, setNodes, edges, setEdges }) {
  // Handle edge connection
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Handle node deletion
  const onNodesDelete = useCallback((deleted) => {
    console.log("deleted", deleted);
    setNodes((nds) => nds.filter((node) => !deleted.find((d) => d.id === node.id)));
  }, [setNodes]);

  
  // Handle edge deletion
  const onEdgesDelete = useCallback((deleted) => {
    console.log("deleted", deleted);
    
    setEdges((eds) => eds.filter((edge) => !deleted.find((d) => d.id === edge.id)));
  }, [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      fitView
      deleteKeyCode={46} // Enable deletion on pressing the 'Delete' key
      nodeTypes={{ custom: Node }} // Ensure the custom node (if any) is rendered
     
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};

function CustomNode({ id, data }) {
  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this node?')) {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    }
  };

  return <Node id={id} label={data.label} onDelete={handleDelete} />;
}

