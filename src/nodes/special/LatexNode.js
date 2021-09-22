import { Handle } from "react-flow-renderer";
import { NodeWrapper, InputLabel } from "./styles";
const LatexNode = (self) => {
  return (
    <NodeWrapper background="black">
      <InputLabel color="red">
        <p>{self.data.label}</p>
      </InputLabel>
      <Handle
        type="target"
        position="top"
        id="target-1"
        style={{ left: "40%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="target"
        position="top"
        id="target-2"
        style={{ left: "60%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        position="bottom"
        id="source-1"
        style={{ left: "50%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </NodeWrapper>
  );
};

export default LatexNode;
