
import React, { useCallback } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

function FlowEditor({ nodes, setNodes, edges, setEdges }) {
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      const deletedIds = deleted.map(node => node.id);
      setNodes((nds) => nds.filter((node) => !deletedIds.includes(node.id)));
      setEdges((eds) =>
        eds.filter((edge) => !deletedIds.includes(edge.source) && !deletedIds.includes(edge.target))
      );
    },
    [setNodes, setEdges]
  );

  const onEdgesDelete = useCallback(
    (deleted) => {
      const deletedIds = deleted.map(edge => edge.id);
      setEdges((eds) => eds.filter((edge) => !deletedIds.includes(edge.id)));
    },
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) => setNodes((nds) => applyNodeChanges(changes, nds))}
        onEdgesChange={(changes) => setEdges((eds) => applyEdgeChanges(changes, eds))}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        fitView
        multiSelectionKeyCode="Shift"
        selectNodesOnDrag
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default FlowEditor;
