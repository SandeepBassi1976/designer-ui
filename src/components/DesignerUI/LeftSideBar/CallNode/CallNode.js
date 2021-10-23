import { InputLabel, CustomWrapper } from "../styles";
import { Handle, Position } from "react-flow-renderer";
//import Card from "@material-ui/core/Card";
//import CardContent from "@material-ui/core/CardContent";

const CallNode = (self) => {
  const Component = self.data.component;
  return (
    <CustomWrapper>
      <InputLabel>{self.data.label}</InputLabel>
      <Handle
        id="a"
        type="target"
        position={Position.Top}
        onConnect={(params) => console.log("handle onConnect", params)}
      />

      <Component />
      <Handle
        id="b"
        type="target"
        position="left"
        onConnect={(params) => console.log("handle onConnect", params)}
      />

      <Handle
        id="c"
        type="source"
        position="right"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </CustomWrapper>
  );
};

export default CallNode;
