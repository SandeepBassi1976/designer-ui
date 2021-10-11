import React, {
  useRef,
  useEffect,
  useContext,
  useState,
  Fragment,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  updateEdge,
  removeElements,
  isEdge,
} from "react-flow-renderer";
import CustomEdge from "./components/Edge";
import uuid from "react-uuid";
import StoreContext from "./context/Store";
import Sidebar from "./components/Sidebar";
import Drawer from "./components/Drawer";
import "./style/dnd.css";
import "./main.css";
import customNodes from "./components/Nodes";
import { loadFunctionsToNode } from "./storage/helpers/loadFunctionsToNode";
import { createGlobalStyle } from "styled-components";
import "./components/DesignerUI/RightSideBar/RightBar.css";
import adjustScreen from "./storage/dom/adjustScreen";
import { getDataFromDb } from "./storage/db";
import initialElements from "./components/initial-elements";


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
    flagColor,
  } = useContext(StoreContext);

  const [data, setData] = useState([]);
  const [showJson, setShowJson] = useState(false);
  const [nodeName, setNodeName] = useState([]);
  const reactFlowWrapper = useRef(null);



  const onConnect = (params) => {

    if (params.source === params.target) {
   alert('an error has occured');
    } else {
      setElements((els) =>
        addEdge(
          {
            ...params,
            sourceX: 10,
            sourceY: 10,
            style: { stroke: flagColor, strokeWidth: "2px" },
            data: { 
              source: params.source,
              target: params.target,
              payload: nodeName, 
              }
          },
          els
        )
      );
    }

   /*  setTest((test) => [...test, params.target]);
    test.map((t) => {
      if (t === params.target) {
        alert("node has already a source");
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

      console.log(elements);
    });

    const values = Object.values(elements);

    values.forEach((e, i, final) => console.log(e)); */
  };

  useEffect(() => {
    const newElements = elements.map((els) => {
      if (isEdge(els)) {
        return {
          ...els,
          style: {
            ...els.style,
            stroke: flagColor,
          },
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

  const onElementsRemove = (elementsToRemove) => {
    console.log(elementsToRemove);
    setElements((els) => removeElements(elementsToRemove, els));
  };

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);

    const data = getDataFromDb(nodeClass);
    data.then((flow) => {
        adjustScreen(flow, _reactFlowInstance);
        setElements(flow.elements);
      })
      .catch((err) => {
        console.log(err);
        setElements(initialElements);
      });
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    setData((data) => [...data, type]);
    setNodeName(type);
    setShowJson(true);
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
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
        sourceCount: 1,
      },
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
  };
  const edgeTypes = {
    custom: CustomEdge,
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
                background: theme === "light" ? "#dde1e4" : "rgb(35,35,35)",
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
                  node: {},
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
            ></ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
      <div className="rightFlow">
        <aside>
          <b>{nodeName}</b>

          <p>{showJson && JSON.stringify(data)}</p>
        </aside>
      </div>
    </Fragment>
  );
};
export default DnDFlow;
