import { Handle } from "react-flow-renderer";
import { NodeWrapper, InputLabel } from "./styles";
const JoinNode = (self) => {
  return (
    <NodeWrapper>
      <InputLabel>{self.data.label}</InputLabel>
      <Handle
        type="target"
        position="top"
        id="b"
        style={{ left: "50%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        position="bottom"
        id="b"
        style={{ left: "50%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </NodeWrapper>
  );
};

export default JoinNode;
