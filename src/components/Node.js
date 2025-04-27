import React from 'react';

const Node = ({ node, onDelete }) => {
  return (
    <div className="node">
      <span>{node.name} - ${node.price}</span>
      <button onClick={() => onDelete(node.id)}>Delete</button>
      console.log("delete", node);
      
    </div>
  );
};

export default Node;