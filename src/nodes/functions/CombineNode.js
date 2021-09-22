import { Handle, useUpdateNodeInternals } from "react-flow-renderer";
import { NodeWrapper, InputLabel } from "./styles";
import React, { useEffect } from "react";

const CombineNode = (self) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const inputArray = [];
  //const outputArray = [];
  let kI = Number(self.data.targetCount) + 1;
  //let kO = Number(self.data.sourceCount) + 1;
  let t1 = 0;
  //let t2 = 0;

  //const count = 0;
  for (let index = 0; index < self.data.targetCount; index++) {
    inputArray.push(index);
  }
  useEffect(() => {
    updateNodeInternals(self.id);
  }, [self.data.targetCount, self.data.sourceCount]);
  return (
    <NodeWrapper>
      <InputLabel>{self.data.label}</InputLabel>
      {inputArray.map((i, index) => {
        t1 = t1 + 1;
        return (
          <Handle
            key={index}
            type="target"
            position="top"
            id={`target${index + 1}`}
            className="node-handle"
            style={{ left: (100 * t1) / kI + "%", background: "white" }}
          />
        );
      })}
      <Handle
        type="source"
        position="bottom"
        id="source1"
        className="node-handle"
        style={{ left: "50%", background: "white" }}
      />
    </NodeWrapper>
  );
};

export default CombineNode;
