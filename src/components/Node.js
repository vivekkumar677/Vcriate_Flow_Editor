import React from 'react';

const Node = ({ data }) => (
  <div className="p-4 bg-white border rounded shadow-sm">
    <h3 className="font-semibold">{data.name}</h3>
    <p className="text-sm text-gray-500">${data.price}</p>
  </div>
);

export default Node;
