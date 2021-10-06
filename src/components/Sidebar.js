import React, {useContext,Fragment, useEffect} from "react";
import StoreContext from "../context/Store";
import Collapsible from "react-collapsible";
import localforage from "localforage";
import * as types from "../NodeTypes";


export default () => {
  const { elements, } = useContext(StoreContext);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  localforage.config({
    name: "LocalForage DB",
    storeName: "Node-Flow"
  });

  //console.log('Hello from SideBar');


  return (
    <Fragment>
    <aside>
      <button
        style={{ width: "100%", background:'#d7d9e4' }}
        onClick={() => {
          console.log(JSON.stringify(elements))}}
      >
        Generate JSON
      </button>
      <br />
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
        </Collapsible>
    </aside>
   {/*  <p>
        {
          viewJson && ( JSON.stringify(elements)  )

        }  
     
    </p> */}
</Fragment>
  );
};
