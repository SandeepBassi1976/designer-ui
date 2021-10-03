import RuleSetNode from "./components/DesignerUI/LeftSideBar/RuleSetNode/RuleSetNode";
import ScriptNode from "./components/DesignerUI/LeftSideBar/ScriptNode/ScriptNode";
import RuleNode from "./components/DesignerUI/LeftSideBar/RuleNode/RuleNode";
import CallNode from "./components/DesignerUI/LeftSideBar/CallNode/CallNode";
import SetNode from "./components/DesignerUI/LeftSideBar/SetNode/SetNode";
import IfNode from "./components/DesignerUI/LeftSideBar/IfNode/IfNode";


const customNodes = {
  RULESET:RuleSetNode,
  SCRIPT:ScriptNode,
  RULE:RuleNode,
  CALL:CallNode,
  SET:SetNode,
  IF:IfNode,
};

export default customNodes;
