import { NodeWrapper, InputLabel } from "../styles";
import { Handle, Position } from "react-flow-renderer";

const ScriptNode = (self) => {
  const Component = self.data.component;
  return (
    <NodeWrapper>
      <InputLabel>{self.data.label}</InputLabel>
      <Handle
        id="input"
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Component />
      <Handle
        id="a"
        type="source"
        position={Position.Right}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        id="b"
        type="source"
        position={Position.Bottom}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </NodeWrapper>
  );
};

export default ScriptNode;
