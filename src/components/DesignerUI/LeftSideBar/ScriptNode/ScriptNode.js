import { NodeWrapper, InputLabel } from "../styles";
import { Handle } from "react-flow-renderer";

const ScriptNode = (self) => {
  return (
    <NodeWrapper>
      <InputLabel>{self.data.label}</InputLabel>
      <Handle
        type="target"
        position="left"
        id="b"
        style={{ top: "50%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
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
