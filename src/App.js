import React, { useState, useRef, useEffect, useContext } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  updateEdge,
  removeElements,
  Controls,
  ControlButton,
  Background,
  MiniMap,
  Handle,
  useZoomPanHelper,
  getIncomers,
  getOutgoers,
  isEdge
} from "react-flow-renderer";
import CustomEdge from "./CustomEdge";
import uuid from "react-uuid";
import StoreContext from "./context/Store";
import Sidebar from "./components/Sidebar";
import Drawer from "./components/Drawer";
import TopMenu from "./components/TopMenu";
import "./nodes/dnd.css";
import "./main.css";
import initialElements from "./initial-elements";
import customNodes from "./CustomNodes";
import localForage from "localforage";
import { NotificationContainer } from "react-notifications";
import { loadFunctionsToNode } from "./globals/helpers/loadFunctionsToNode";
import { getDataFromDb } from "./globals/db";
import adjustScreen from "./globals/dom/adjustScreen";
import { openNotification as notification } from "./globals/dom/notification";
import { createGlobalStyle } from "styled-components";
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

  const reactFlowWrapper = useRef(null);

  const onConnect = (params) => {
    if (params.source === params.target) {
      notification("ERROR!", "Kendisine bağlanamaz", "error");
    } else {
      setElements((els) =>
        addEdge(
          {
            ...params,
            animated: true,
            sourceX: 10,
            sourceY: 10,
            style: { stroke: flagColor, strokeWidth: "2px" },
            data: { source: "", target: "", payload: "Anaks" }
          },
          els
        )
      );
    }
  };
  useEffect(() => {
    const newElements = elements.map((els) => {
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
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  };
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);

    // const data = getDataFromDb(nodeClass);
    // data
    //   .then((flow) => {
    //     adjustScreen(flow, _reactFlowInstance);
    //     setElements(flow.elements);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setElements(initialElements);
    //   });
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top
    });

    const nodeFunction = loadFunctionsToNode(type, nodeClass);
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
    <div className="dndflow">
      <ReactFlowProvider>
        <TopMenu />
        <Sidebar />
        <Drawer show={showDrawer}></Drawer>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            edgeTypes={edgeTypes}
            style={{
              background:
                theme === "light" ? "rgb(215,215,215)" : "rgb(35,35,35)"
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
            //onNodeDragStart={(e, node) => console.log(node)}
            //onNodeDrag={(e, node) => console.log(node)}
            //onNodeDragStop={(e, node) => console.log(node)}
            //onNodeMouseEnter={(e, node) => console.log(node)} //hover
            //onNodeMouseLeave={(e, node) => console.log(node)} //hover leave
            onNodeContextMenu={onNodeContextMenu} //sağ tıklama
            //onConnectEnd={(e) => console.log(e)}
            //onMove={(flowTransform) => console.log(flowTransform)} //return x,y,zoom
            //onSelectionChange={(els) => console.log(els)}
            deleteKeyCode={46}
            nodeTypes={customNodes}
            minZoom={0.1}
            maxZoom={4}
            multiSelectionKeyCode={17}
            zoomActivationKeyCode={90}
            zoomOnDoubleClick={false}
            connectionLineStyle={{ stroke: "#3498db", strokeWidth: 2 }}
          >
            <Controls>
              <ControlButton>SAFDS</ControlButton>
            </Controls>
            <Background
              gap={55}
              color={theme === "light" ? "#7f8c8d" : "rgb(170,170,170)"}
              size={theme === "light" ? "2.5px" : "1px"}
            />
            <MiniMap nodeColor="gray" />
          </ReactFlow>
        </div>
        <NotificationContainer />
      </ReactFlowProvider>
    </div>
  );
};
export default DnDFlow;
