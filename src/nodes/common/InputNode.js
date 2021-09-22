import { NodeWrapper, InputLabel } from "./styles";
import {
  Handle,
  getOutgoers,
  isEdge,
  getConnectedEdges,
  useUpdateNodeInternals
} from "react-flow-renderer";
import { getNodesAndEdges } from "../../globals/helpers/elementController";
import React, { useContext, useEffect, useState } from "react";
import StoreContext from "../../context/Store";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import CollapseButton from "../../components/global/CollapseButton";
import Icon from "../../components/global/Icon";
import setVariable from "../../assets/icons/setVariables.png";
import collapseIcon from "../../assets/icons/collapseIcon.png";
import expandIcon from "../../assets/icons/expandIcon.png";
import tagIcon from "../../assets/Tag.png";
import testIcon from "../../assets/Test.png";

import Header from "../../components/global/Header";
import { Triangle, Circle, Flag } from "../../components/global/Tag";
const InputNode = (self) => {
  const {
    elements,
    setElements,
    nodeClass,
    flagColor,
    setFlagColor
  } = useContext(StoreContext);
  const updateNodeInternals = useUpdateNodeInternals();
  const [values, setValues] = useState([
    {
      source1: "Anaks"
    }
  ]);
  const [text, setText] = useState("Anaks");
  const [checked, setChecked] = useState(false);
  let outgoers = getOutgoers(self, elements);
  const checkboxChange = (e) => {
    setChecked(!checked);
    const { edges } = getNodesAndEdges(elements);
    const mySources = edges.filter((edge) => edge.source === self.id);
    const handles = mySources.map((s) => s.sourceHandle);
    //console.log("my-handles", handles);
    const src = handles.map((h) => {
      return { [h]: text };
    });
    //-console.log("src:", src);
    if (src.length > 0) {
      setValues([...src]);
    }
  };
  const textChange = (e) => {
    setText(e.target.value);
  };
  //const inputArray = [];
  const outputArray = [];
  //let kI = Number(self.data.targetCount) + 1;
  let kO = Number(self.data.sourceCount) + 1;
  let t1 = 0;
  //let t2 = 0;

  //const count = 0;
  for (let index = 0; index < self.data.sourceCount; index++) {
    outputArray.push(index);
  }
  useEffect(() => {
    // const { edges } = getNodesAndEdges(elements);
    // const mySources = edges.filter((edge) => edge.source === self.id);
    // const handles = mySources.map((s) => s.sourceHandle);
    // console.log("my-elements", handles);
    // const src = handles.map((h) => {
    //   return { [h]: text };
    // });
    // console.log("src:", src);
    // if (src.length > 0) {
    //   setValues([...src]);
    // }
  }, [self.data.sourceCount, checked, text]);
  useDidMountEffect(() => {
    nodeClass.doInput(values, self, outgoers);
  }, [values]);
  useEffect(() => {
    updateNodeInternals(self.id);
  }, [self.data.targetCount, self.data.sourceCount]);
  const [expand, setExpand] = useState(false);
  const expandMenu = () => {
    setExpand(!expand);
  };
  return (
    <NodeWrapper>
      <Header>
        <img src={setVariable} width="20" height="20" />
        <InputLabel>{self.data.label}</InputLabel>
        <Triangle color={flagColor}>
          <img
            src={tagIcon}
            alt="noimg"
            width="20px"
            height="20px"
            className="nodrag"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              userSelect: "none"
            }}
          />
        </Triangle>
      </Header>
      <div onClick={expandMenu}>
        <img
          src={expand === true ? expandIcon : collapseIcon}
          alt="noimg"
          width="9"
          height="5"
          style={{ textAlign: "center", marginBottom: "5px" }}
        />
      </div>
      {expand === true ? (
        <div className="nodrag nowhell">
          <input
            style={{ width: "80%" }}
            type="text"
            className="nodrag nowheel"
            value={text}
            onChange={textChange}
          />
          <input type="checkbox" onChange={checkboxChange} />
        </div>
      ) : (
        ""
      )}

      {outputArray.map((i, index) => {
        t1 = t1 + 1;
        return (
          <Handle
            key={index}
            type="source"
            position="bottom"
            id={`source${index + 1}`}
            className="node-handle"
            style={{
              left: (100 * t1) / kO + "%"
            }}
          />
        );
      })}
    </NodeWrapper>
  );
};

export default InputNode;
