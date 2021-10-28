import { CustomWrapper, InputLabel } from "../styles";
import { Handle} from "react-flow-renderer";

const RuleNode = (self) => {
  return (
    <CustomWrapper>
      <InputLabel>{self.data.label}</InputLabel>
      <Handle
       className="react-flow__handleCustom"
        type="target"
        position="left"
        id="a"
        style={{ top: "50%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      
      <Handle
       className="react-flow__handleCustom"
        type="source"
        position="right"
        id="b"
        style={{ top: "50%" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </CustomWrapper>
  );
};

export default RuleNode;
