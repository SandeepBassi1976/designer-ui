import React, {useContext,Fragment, useCallback} from "react";
import StoreContext from "../context/Store";
import Collapsible from "react-collapsible";
import localforage from "localforage";
import * as types from "./NodeTypes";

import {saveToDb } from "../storage/db";


export default () => {
  const { elements,reactFlowInstance, } = useContext(StoreContext);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  localforage.config({
    name: "DesignerUI Demo",
    storeName: "Node-Flow"
  });

  const saveFlow = useCallback(() => {
    saveToDb(reactFlowInstance);
  }, [reactFlowInstance]);

  return (
    <Fragment>
    <aside>
      <button
        style={{ width: "50%", background:'#d7d9e4',  borderRadius:'4px'}}
        onClick={() => {
          console.log(JSON.stringify(elements))}}
      >
       Json
      </button>
      
      <button
        style={{ width: "50%", background:'#d7d9e4', borderRadius:'4px'}}
        onClick= {saveFlow}
      >
        Save
      </button> 
      <br />


      <Collapsible
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
          className="dndnode custom"
          onDragStart={(event) => onDragStart(event, types.DEFAULT)}
          draggable
        >
          {types.DEFAULT}
        </div>
        <div
          className="dndnode custom"
          onDragStart={(event) => onDragStart(event, types.RULE)}
          draggable
        >
          {types.RULE}
        </div>
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
      
        </Collapsible>
    </aside>
</Fragment>
  );
};
