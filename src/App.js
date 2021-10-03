import React, {useRef, useEffect, useContext, useState, Fragment, useCallback} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  updateEdge,
  removeElements,
  isEdge,
} from "react-flow-renderer";
import CustomEdge from "./CustomEdge";
import uuid from "react-uuid";
import StoreContext from "./context/Store";
import Sidebar from "./components/Sidebar";
import Drawer from "./components/Drawer";
import "./nodes/dnd.css";
import "./main.css";
import customNodes from "./CustomNodes";
import { NotificationContainer } from "react-notifications";
import { loadFunctionsToNode } from "./globals/helpers/loadFunctionsToNode";
import { createGlobalStyle } from "styled-components";
import  "./components/DesignerUI/RightSideBar/RightBar.css";



export const AppRoot = createGlobalStyle`
  body {
    @import url('../../font.css');
    font-family: Vazir !important;
    direction: rtl;
    text-align: right;
    cursor: default;
  }
`;


const DnDFlow = () => {
  const {
    reactFlowInstance,
    setReactFlowInstance,
    showDrawer,
    setShowDrawer,
    elements,
    setElements,
    clickedElement,
    setClickedElement,
    nodeClass,
    theme,
    flagColor
  } = useContext(StoreContext); 

  const [data, setData] = useState([]);
  const [labelName, setLabelName] = useState([]);
  const [showJson, setShowJson] = useState(false);
  const [nodeName, setNodeName] = useState([]);
  //const [sourceNode, setSourceNode] = useState();
  const [test, setTest] = useState([]);
  const reactFlowWrapper = useRef(null);


  const onConnect = (params) => {
  
   console.log(nodeName);
   
    if (params.source === params.target) {
      alert("Error");
    } else {
      setElements((els) =>
        addEdge(
          {
            ...params,
            animated: true,
            sourceX: 10,
            sourceY: 10,
            style: { stroke: flagColor, strokeWidth: "2px" },
            data: {
              source: params.source,
              target: params.target,
              payload: nodeName,
            },
          },
          els
        )
      );
    }
  };

  useEffect(() => {
    const newElements = elements.map((els) => {
      console.log(els);
      if (isEdge(els)) {
        return {
          ...els,
          style: {
            ...els.style,
            stroke: flagColor
          }
        };
      } else {
        return els;
      }
    });
    setElements(newElements);
  }, [flagColor]);
  
  const onEdgeUpdate = (oldEdge, newConnection) => {
    console.log(oldEdge);
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };


  /* const updateNode = (params) => {
    setLabelName(labelName => [...labelName, params]);
  
  }  */

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    setData(data => [...data, type]);
    setNodeName(type);
    setShowJson(true);
    //updateNode(type);
    //console.log(labelName);
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });

    const nodeFunction = loadFunctionsToNode(type, nodeClass);

  /*   let name = 'CALL';
    let count = 0;
    data.map(d => {
      if(d === name){
        count = count+1;
      }
    })
    if (name === type && count >=2) {
      alert("CALL can not call Itself");
    }  */
   
     const newNode = {
      id: uuid(),
      type,
      position,
      data: {
        label: `${type}`,
        onChange: nodeFunction,
        sample: "Sample",
        targetCount: 1,
        sourceCount: 1
      }
    };
  
    setElements([...elements, newNode]);
  };
  const onElementClick = (event, element) => {
    setClickedElement(element);
  };
  const onElementDoubleClick = (event, element) => {
    setShowDrawer({ enable: false, node: clickedElement });
  };
  const onNodeContextMenu = (e, node) => {
    e.preventDefault();
    console.log(node);
  };
  const edgeTypes = {
    custom: CustomEdge
  };
   

  return (

    <Fragment>
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <Drawer show={showDrawer}></Drawer>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            edgeTypes={edgeTypes}
            style={{
              background:
                theme === "light" ? "#dde1e4" : "rgb(35,35,35)"
            }}
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onElementClick={onElementClick}
            onDoubleClick={onElementDoubleClick}
            onPaneContextMenu={(e) => e.preventDefault()}
            onPaneClick={() =>
              setShowDrawer({
                enable: true,
                node: {}
              })
            }
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onEdgeUpdate={onEdgeUpdate}
            onNodeContextMenu={onNodeContextMenu} 
            deleteKeyCode={46}
            nodeTypes={customNodes}
            minZoom={0.1}
            maxZoom={4}
            multiSelectionKeyCode={17}
            zoomActivationKeyCode={90}
            zoomOnDoubleClick={false}
            connectionLineStyle={{ stroke: "#585858", strokeWidth: 2 }}
          >
          </ReactFlow>
        </div>
        <NotificationContainer />
        <p>
      </p>
      </ReactFlowProvider>
    </div>
    <div className="rightFlow">
        <aside>
          <b>
          {nodeName}
          </b>

          <p>
            {
              showJson && (JSON.stringify(data))
            }
          </p>


        </aside>
      </div>
   
    </Fragment>

  );
};
export default DnDFlow;
