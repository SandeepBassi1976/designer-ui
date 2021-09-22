import { NodeWrapper, InputLabel } from "./styles";
import { Handle } from "react-flow-renderer";

const LessThanNode = (self) => {
  return (
    <NodeWrapper>
      <InputLabel> &lt; </InputLabel>
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

export default LessThanNode;
