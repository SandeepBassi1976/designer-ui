import InputNode from "./nodes/common/InputNode";
import NotificationNode from "./nodes/common/NotificationNode";
import RuleSetNode from "./components/nodes/RuleSetNode";
import ScriptNode from "./components/nodes/ScriptNode";
import RuleNode from "./components/nodes/RuleNode";
import CallNode from "./components/nodes/CallNode";
import SetNode from "./components/nodes/SetNode";
import IfNode from "./components/nodes/IfNode";


const customNodes = {
  "Set Variables": InputNode,
  Notification: NotificationNode,
  RULESET:RuleSetNode,
  SCRIPT:ScriptNode,
  RULE:RuleNode,
  CALL:CallNode,
  SET:SetNode,
  IF:IfNode,
};

export default customNodes;
