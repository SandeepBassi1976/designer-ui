import RuleSetNode from "./DesignerUI/LeftSideBar/RuleSetNode/RuleSetNode";
import ScriptNode from "./DesignerUI/LeftSideBar/ScriptNode/ScriptNode";
import RuleNode from "./DesignerUI/LeftSideBar/RuleNode/RuleNode";
import CallNode from "./DesignerUI/LeftSideBar/CallNode/CallNode";
import SetNode from "./DesignerUI/LeftSideBar/SetNode/SetNode";
import IfNode from "./DesignerUI/LeftSideBar/IfNode/IfNode";


const customNodes = {
  RULESET:RuleSetNode,
  SCRIPT:ScriptNode,
  RULE:RuleNode,
  CALL:CallNode,
  SET:SetNode,
  IF:IfNode,
};

export default customNodes;
