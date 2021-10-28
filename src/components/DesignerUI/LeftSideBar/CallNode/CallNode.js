import { InputLabel, StackWrapper } from "../styles";
import { Handle, Position } from "react-flow-renderer";
//import Card from "@material-ui/core/Card";
//import CardContent from "@material-ui/core/CardContent";

const CallNode = (self) => {
  const Component = self.data.component;
  return (
    <StackWrapper>
      <InputLabel>{self.data.label}</InputLabel>
      <Handle
        className="react-flow__handleMain"
        id="a"
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        className="react-flow__handleMain"
        id="b"
        type="target"
        position="left"
        onConnect={(params) => console.log("handle onConnect", params)}
      />

      <Handle
        className="react-flow__handleMain"
        id="c"
        type="source"
        position="right"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </StackWrapper>
  );
};

export default CallNode;
