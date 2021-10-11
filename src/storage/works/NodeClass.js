import {
  getOutgoers,
  getConnectedEdges,
  isEdge
} from "react-flow-renderer";

import {
  getNodesAndEdges,
} from "../helpers/elementController";
import { openNotification as notification } from "../dom/notification";
export default class Node {
  elements = [];
  nodes = [];
  edges = [];
  payLoad = [];
  constructor(data) {
    console.log(
      `%c ${data}`,
      "background: green; color: white; display: block;"
    );
  }
  applyElements = (elements, setElements, payLoad, setPayLoad) => {
    const { nodes, edges } = getNodesAndEdges(elements);
    this.elements = elements;
    this.nodes = nodes;
    this.edges = edges;
    this.setElements = setElements;
    this.payLoad = payLoad;
    this.setPayLoad = setPayLoad;

  };

  doInput = (data, self, outgoers) => {
    console.log("Input data", data);
    this.sendDataToYourOutgoers(data, self, outgoers);
  };
  doSplit = (data, self, outgoers) => {
  
    this.sendDataToYourOutgoers(data, self, outgoers);
  };
  doCombine = (data, self, outgoers) => {
    console.log("Combine data:", data);
    const datas = this.solveDataFromMyEdges(self);
    console.log(
      "Combine:",
      datas
    );
    let combined = "";
    datas.map((data) => {
      return (combined += data.payload + " ");
    });
  
    notification("Datas combined", combined, "success");
    const connected = getConnectedEdges([self], this.edges);
   
    this.sendDataToYourOutgoers([{ source1: combined }], self, outgoers);
  };
  doNotification = (data, self, outgoers) => {
    console.log("Notification data:", data);
    const datas = this.solveDataFromMyEdges(self);
    console.log(
      "Notification:",
      datas
    );
    datas.map((data) => {
      console.log(
        `%c source: ${data.source}\n target: ${data.target}\n payload: ${data.payload}`,
        "background: orange; color: black; display: block;"
      );
      notification(data.target, data.payload, "success");
    });
  };
  sendDataToYourOutgoers = (data, self, outgoers) => {
    console.log("SEND DATA TO YOUR OUTGOERS");
    console.log("-----------------------------");
    this.combineEdgesWithData(data, self);
    outgoers.map((node) => {
      console.log(`"${node.type}" Outgoers...`);
      const childOutgoers = getOutgoers(node, this.elements);
      return node.data.onChange(data, node, childOutgoers);
    });
  };
  solveDataFromMyEdges = (self) => {
    const targets = this.edges.filter((edge) => edge.target === self.id);
    return targets.map((target) => target.data);
  };
  combineEdgesWithData = (data, self) => {
    let indis = 0;
    const newElements = this.elements.map((element, index) => {
      if (isEdge(element)) {
        if (element.source === self.id) {
          return {
            ...element,
            data: {
              source: element.sourceHandle,
              target: element.targetHandle,
              payload: data[indis++][element.sourceHandle]
            }
          };
        }
        return element;
      }
      return element;
    });
    this.setElements(newElements);
    this.applyElements(newElements, this.setElements);
  };
}
