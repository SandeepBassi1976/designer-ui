import localforage from "localforage";
import { loadFunctionsToNode } from "../helpers/loadFunctionsToNode";
export const getDataFromDb = async (nodeClass) => {
  return await localforage
    .getItem("rules")
    .then((storedFlow) => {
      if (storedFlow) {
        const flow = JSON.parse(storedFlow);
        const flowElements = flow.elements;
        const elements = flowElements.map((els) => {
          return {
            ...els,
            data: {
              ...els.data,
              onChange: loadFunctionsToNode(els.type, nodeClass)
            }
          };
        });
        return {
          elements,
          position: flow.position,
          zoom: flow.zoom
        };
      } else {
        return Promise.reject("No flow");
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
export const saveToDb = async (reactFlowInstance) => {
  if (reactFlowInstance) {
    const flow = reactFlowInstance.toObject();
    console.log(flow);
    return await localforage
      .setItem("rules", JSON.stringify(flow))
      .then((res) => {
        alert("Save successful");
      })
      .catch((err) => Promise.reject(err));
  } else {
    Promise.reject("No reactflow instance");
  }
};
