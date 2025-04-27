
import ReactFlow, { addEdge, MiniMap, Controls, Background } from 'reactflow';
import { useCallback } from 'react';

export default function FlowEditor({ nodes, setNodes, edges, setEdges }) {
  // Handle edge connection
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  console.log(edges);
  

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
}
