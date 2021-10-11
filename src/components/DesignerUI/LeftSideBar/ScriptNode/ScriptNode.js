import { NodeWrapper, InputLabel } from "../styles";
import { Handle } from "react-flow-renderer";

const ScriptNode = (self) => {
  return (
    <NodeWrapper>
      <InputLabel>{self.data.label}</InputLabel>
      <Handle
        type="target"
        position="bottom"
        id="b"
        style={{ left: "50%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        position="top"
        id="b"
        style={{ left: "50%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </NodeWrapper>
  );
};

export default ScriptNode;
