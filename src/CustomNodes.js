import InputNode from "./nodes/common/InputNode";
import NotificationNode from "./nodes/common/NotificationNode";
import ParserNode from "./nodes/common/ParserNode";
import CombineNode from "./nodes/functions/CombineNode";
import SwitchNode from "./nodes/functions/SwitchNode";
import DelayNode from "./nodes/functions/DelayNode";
import SerialPortNode from "./nodes/network/SerialPortNode";
import EthernetNode from "./nodes/network/EqualsToNode";
import SplitNode from "./nodes/sequences/SplitNode";
import JoinNode from "./nodes/sequences/JoinNode";
import BatchNode from "./nodes/sequences/BatchNode";
import SortNode from "./nodes/sequences/SortNode";
import FileInNode from "./nodes/storage/FileInNode";
import FileOutNode from "./nodes/storage/FileOutNode";
import DonutNode from "./nodes/special/DonutNode";
import LatexNode from "./nodes/special/LatexNode";
import TestNode  from "./nodes/network/NotEqualsToNode";
import RuleSetNode from "./nodes/network/RuleSetNode";
import ScriptNode from "./nodes/network/ScriptNode";
import RuleNode from "./nodes/network/RuleNode";
import CallNode from "./nodes/network/CallNode";
import SetNode from "./nodes/network/SetNode";
import IfNode from "./nodes/network/IfNode";
import AndNode from "./nodes/network/AndNode";
import NotNode from "./nodes/network/NotNode";
import OrNode from "./nodes/network/OrNode";
import EqualsToNode from "./nodes/network/EqualsToNode";
import NotEqualsToNode from "./nodes/network/NotEqualsToNode";
import LessThanNode from "./nodes/network/LessThanNode";
import GreaterThanNode from "./nodes/network/GreaterthanNode";




const customNodes = {
  "Set Variables": InputNode,
  Notification: NotificationNode,
  Parser: ParserNode,
  Combine: CombineNode,
  Switch: SwitchNode,
  Delay: DelayNode,
  SerialPort: SerialPortNode,
  Ethernet: EthernetNode,
  Split: SplitNode,
  Join: JoinNode,
  Batch: BatchNode,
  Sort: SortNode,
  FileIn: FileInNode,
  FileOut: FileOutNode,
  Donut: DonutNode,
  Latex: LatexNode,
  Test: TestNode,
  RULESET:RuleSetNode,
  SCRIPT:ScriptNode,
  RULE:RuleNode,
  CALL:CallNode,
  SET:SetNode,
  IF:IfNode,
  AND:AndNode,
  OR:OrNode,
  NOT:NotNode,
  EQUALSTO:EqualsToNode,
  NOTEQULASTO:NotEqualsToNode,
  GREATERTHAN:GreaterThanNode,
  LESSTHAN:LessThanNode,
};

export default customNodes;
