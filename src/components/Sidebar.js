import React, { useCallback, useState, useContext } from "react";
import styled from "@emotion/styled";
import StoreContext from "../context/Store";
import Collapsible from "react-collapsible";
import localforage from "localforage";
import {
  getConnectedEdges,
  isEdge,
  getBezierPath,
  useStore,
  useZoomPanHelper
} from "react-flow-renderer";
import * as types from "../NodeTypes";
import { getDataFromDb, saveToDb } from "../globals/db";
export default () => {
  const { elements, setElements, reactFlowInstance, nodeClass } = useContext(
    StoreContext
  );
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  localforage.config({
    name: "LocalForage DB",
    storeName: "Anaks-Flow"
  });
  const { transform } = useZoomPanHelper();

  const onRestore = () => {
    const data = getDataFromDb(nodeClass);
    data
      .then((flow) => {
        setElements(flow.elements);
        console.log(flow.elements)
      })
      .catch((err) => {
        console.log(err);
        setElements([]);
      });
  };

  const saveFlow = useCallback(() => {
    saveToDb(reactFlowInstance);
  }, [reactFlowInstance]);

  const [test, setTest] = useState("");
  const store = useStore();
  const { zoomIn, zoomOut, setCenter } = useZoomPanHelper();

  const getConnectedHandle = () => {
    const edgeArray = [];
    const nodeArray = [];
    elements.map((els) => {
      if (isEdge(els)) {
        return edgeArray.push(els);
      } else {
        return nodeArray.push(els);
      }
    });

    let connectedEdges = getConnectedEdges(nodeArray, edgeArray);
    console.log("connected edges", connectedEdges);
    connectedEdges.map((e) => {
      return elements.map((els) => {
        if (e.source === els.id) {
          return console.log(els.type);
        }
        if (e.target === els.id) {
          return console.log(els.type);
        }
        return "";
      });
    });
  };

  return (
    <aside>
     
      <button style={{ width: "100%" }} onClick={saveFlow}>
        Save Flow
      </button>
      <button
        style={{ width: "100%" }}
        onClick={() => console.log(JSON.stringify(elements))}
      >
        Log Elements
      </button>
      <button onClick={getConnectedHandle}>Get Connected Edges</button>
      {/* <button onClick={() => console.log(pRef.current.innerHTML)}>
        Paragraph
      </button> */}
      <button onClick={onRestore}>Get Flow</button>
      <br />
      <br />
  {/*     <Collapsible
        trigger="Common"
        triggerStyle={{
          color: "red",
          cursor: "pointer",
          marginBottom: "5px",
          userSelect: "none",
          display: "block"
        }}
        open={true}
        transitionTime={100}
      >
        <div
          className="dndnode common"
          onDragStart={(event) => onDragStart(event, types.INPUT)}
          draggable
        >
          {types.INPUT}
        </div>
        <div
          className="dndnode common"
          onDragStart={(event) => onDragStart(event, types.NOTIFICATION)}
          draggable
        >
          {types.NOTIFICATION}
        </div>
        <div
          className="dndnode common"
          onDragStart={(event) => onDragStart(event, types.PARSER)}
          draggable
        >
          {types.PARSER}
        </div>
      </Collapsible> */}

     {/*  <Collapsible
        trigger="Functions"
        triggerStyle={{
          color: "red",
          cursor: "pointer",
          marginBottom: "5px",
          userSelect: "none",
          display: "block"
        }}
        open={true}
        transitionTime={100}
      >
        <div
          className="dndnode functions"
          onDragStart={(event) => onDragStart(event, types.COMBINE)}
          draggable
        >
          {types.COMBINE}
        </div>
        <div
          className="dndnode functions"
          onDragStart={(event) => onDragStart(event, types.SWITCH)}
          draggable
        >
          {types.SWITCH}
        </div>
        <div
          className="dndnode functions"
          onDragStart={(event) => onDragStart(event, types.DELAY)}
          draggable
        >
          {types.DELAY}
        </div>
      </Collapsible> */}


      <Collapsible
        trigger="SideBar"
        triggerStyle={{
          color: "red",
          cursor: "pointer",
          marginBottom: "5px",
          userSelect: "none",
          display: "block"
        }}
        open={true}
        transitionTime={100}
      >
        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.SCRIPT)}
          draggable
        >
          {types.SCRIPT}
        </div>
        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.RULESET)}
          draggable
        >
          {types.RULESET}
        </div>
        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.RULE)}
          draggable
        >
          {types.RULE}
        </div>
        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.CALL)}
          draggable
        >
          {types.CALL}
        </div>

        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.SET)}
          draggable
        >
          {types.SET}
        </div>

        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.IF)}
          draggable
        >
          {types.IF}
        </div>

        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.AND)}
          draggable
        >
          {types.AND}
        </div>

        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.OR)}
          draggable
        >
          {types.OR}
        </div>

        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.NOT)}
          draggable
        >
          {types.NOT}
        </div>

        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.EQUALSTO)}
          draggable
        >
          ==
        </div>

        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.NOTEQULASTO)}
          draggable
        >
          !=
        </div>

        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.LESSTHAN)}
          draggable
        >
         &lt;
        </div>

        <div
          className="dndnode network"
          onDragStart={(event) => onDragStart(event, types.GREATERTHAN)}
          draggable
        >
         &gt;
        </div>
        

        </Collapsible>
     

      {/* <Collapsible
        trigger="Sequences"
        triggerStyle={{
          color: "red",
          cursor: "pointer",
          marginBottom: "5px",
          userSelect: "none",
          display: "block"
        }}
        open={true}
        transitionTime={100}
      >
        <div
          className="dndnode sequences"
          onDragStart={(event) => onDragStart(event, types.SPLIT)}
          draggable
        >
          {types.SPLIT}
        </div>
        <div
          className="dndnode sequences"
          onDragStart={(event) => onDragStart(event, types.JOIN)}
          draggable
        >
          {types.JOIN}
        </div>
        <div
          className="dndnode sequences"
          onDragStart={(event) => onDragStart(event, types.BATCH)}
          draggable
        >
          {types.BATCH}
        </div>
        <div
          className="dndnode sequences"
          onDragStart={(event) => onDragStart(event, types.SORT)}
          draggable
        >
          {types.SORT}
        </div>
      </Collapsible> */}
    </aside>
  );
};
