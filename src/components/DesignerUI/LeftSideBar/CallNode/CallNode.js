import { InputLabel, CustomWrapper } from "../styles";
import { Handle, Position } from "react-flow-renderer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const CallNode = (self) => {
  return (
    <CustomWrapper>
      <InputLabel>
        <Card>
          <CardContent>
            I'm custom node <br />
            {self.data.label}
            <br />
            I'm custom node <br />
            {self.data.label}
            <br />
            I'm custom node <br />
            {self.data.label}
            <br />
          </CardContent>
        </Card>
      </InputLabel>
      <Handle id="b" type="target" position={Position.Top} />
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
    </CustomWrapper>
  );
};

export default CallNode;
