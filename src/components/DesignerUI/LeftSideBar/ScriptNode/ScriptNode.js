import { NodeWrapper, InputLabel } from "../styles";
import { Handle, Position } from "react-flow-renderer";

const ScriptNode = (self) => {
  return (
    <NodeWrapper>
    <InputLabel>{self.data.label}</InputLabel>
    <Handle
      className="react-flow__handleMain"
      type="target"
      position="left"
      id="a"
      style={{ top: "50%" }}
      onConnect={(params) => console.log("handle onConnect", params)}
    />

    <Handle
      className="react-flow__handleMain"
      type="source"
      position="right"
      id="b"
      style={{ top: "50%" }}
      onConnect={(params) => console.log("handle onConnect", params)}
    />
  </NodeWrapper>
  );
};

export default ScriptNode;
