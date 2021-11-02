import React, {useRef,useEffect,useContext,useState,Fragment,} from "react";
import ReactFlow, {ReactFlowProvider,addEdge,updateEdge,isEdge,removeElements,} from "react-flow-renderer";
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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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


  const reactFlowWrapper = useRef(null);
  const [nodeName, setNodeName] = useState("default");

  const ConditionNode = (props) => (
    <Card>
      <CardContent>
      <div style={{ textAlign: "center", padding: 8 }}>
        <div
          style={{
            color: "#888",
            backgroundColor: "#eee",
            borderRadius: 3,
            padding: 4,
          }}
        >
          {props.rule}
      
        </div>
        <div
          style={{
            color: "#aaa",
            padding: 4,
            textTransform: "uppercase",
            fontSize: 10,
            fontWeight: "bold",
          }}
        >
          and
        </div>
        <div>
          <div
            style={{
              color: "#888",
              backgroundColor: "#eee",
              borderRadius: 3,
              padding: 4,
            }}
          >
            {"cart total ≥ 200.00"}
          </div>
        </div>
      </div>
      </CardContent>
    </Card>
  );

  const onConnect = (params) => {
    /* let target = params.target;
    setTest((test) => [...test, target]);

    test.map((t) => {
     (params.source === params.target || t === params.target)
     alert("node has already a source");
    }); */


    if (params.source === params.target) {
      alert("An error has occured");
    } else {
      setElements((els) =>
      addEdge(
        {
          ...params,
          sourceX: 10,
          sourceY: 10,
          style: { stroke: flagColor, strokeWidth: "1px" },
          data: {
            source: params.source,
            target: params.target,
            payload: nodeName,
            label: nodeName,
            /* label is coming from component state, that's why h2 is not updating in OnConnect method of stored data
           1. need to pass the label or payload in <params> parameter
           */
          },
        },
        els
      )
      );
    }

    console.log(elements);
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
    console.log(elements);
  };

  const onElementsRemove = (elementsToRemove) => {
    //console.log(elementsToRemove);
    setElements((els) => removeElements(elementsToRemove, els));
  };

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);

    const data = getDataFromDb(nodeClass);
    data
      .then((flow) => {
        adjustScreen(flow, _reactFlowInstance);
        setElements(flow.elements);
      })
      .catch((err) => {
        console.log(err);
        setElements(initialElements);
      });
  };

  const onDragOver = (event) => {
    event.preventDefault();  //  Default behavior is not to allow a drop
    event.dataTransfer.dropEffect = "move";
    //console.log(event)
  };



  const onDrop = (event) => {
    event.preventDefault();  
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    setNodeName(type);

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
        component: () => <ConditionNode />
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

  const nodeNames = () => {
    let node;
    {
      elements.map((els, i, { length }) => {
        if (i + 1 === length) {
          node = els.data.label;
        }
      });
    }
    return node;
  };

 /*  const onNodeDragStop = (event, node) => {
    
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

  } */

  const onDropCapture = event => {
   
    let targetName = event.target.innerHTML;
    console.log(targetName);

    console.log(event.dataTransfer.effectAllowed);

 /*  if(targetName === 'CALL'){
    alert(event.dataTransfer.effectAllowed = 'none');
  } */
   
  } 
  

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
                background: theme === "light" ? "#ffffff" : "rgb(35,35,35)",
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
              onDropCapture={onDropCapture}
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
          <b>{nodeNames()}</b>

          {elements.map(
            (ele) =>
              ele.data.label !== ele.data.payload && <p>{ele.data.label}</p>
          )}
        </aside>
      </div>
    </Fragment>
  );
};
export default DnDFlow;
