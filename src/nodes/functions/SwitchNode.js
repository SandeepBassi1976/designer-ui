import { Handle } from "react-flow-renderer";
import { NodeWrapper, InputLabel } from "./styles";

const SwitchNode = (self) => {
  return (
    <NodeWrapper>
      <InputLabel>{self.data.label}</InputLabel>
      <Handle
        type="target"
        position="top"
        id="target-1"
        style={{ left: "50%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        position="bottom"
        id="source-1"
        style={{ left: "40%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        position="bottom"
        id="source-2"
        style={{ left: "60%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </NodeWrapper>
  );
};

export default SwitchNode;
