import React from "react";
import { Handle } from "react-flow-renderer";

export default ({ data, selected }) => {

 
  const onDragOver = e => {
	  e.preventDefault();
  }

  const onDrop = (event) => {
    event.preventDefault();  

  };

  return (
    <div
      style={{
        border: "1px solid blue",
        textAlign: "center",
        padding: 5,
		minHeight: "200px",
		minWidth:'15rem',
        fontSize: "0.7rem",
        borderColor: selected ? "green" : "blue",
      }}
    >
      <Handle type="target" position="top" />
      <div
	  className ="droppable"
	  onDragOver={(e) => onDragOver(e)}
	  onDrop={(e) => onDrop(e, 'complete')}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
		  background:'yellow',
		  minHeight:'200px',
        }}
      >
        {data.label}
      </div>
      <Handle type="source" position="bottom" />
    </div>
  );
};
