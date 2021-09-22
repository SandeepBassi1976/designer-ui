import * as actionTypes from "../actions/actionTypes";

const initialElements = [
  [
    {
      id: "228d31c-3440-e33a-1ff2-167aa5ce84a",
      type: "Set Variables",
      position: { x: 475, y: 212 },
      data: {
        label: "Set Variables",
        sample: "Sample",
        targetCount: 1,
        sourceCount: 1
      }
    },
    {
      id: "bfbe564-3e50-22fe-51c-5b4641a007",
      type: "Notification",
      position: { x: 651, y: 320 },
      data: {
        label: "Notification",
        sample: "Sample",
        targetCount: 1,
        sourceCount: 1
      }
    },
    {
      source: "228d31c-3440-e33a-1ff2-167aa5ce84a",
      sourceHandle: "source1",
      target: "bfbe564-3e50-22fe-51c-5b4641a007",
      targetHandle: "target1",
      animated: true,
      sourceX: 10,
      sourceY: 10,
      style: { stroke: "green", strokeWidth: "2px" },
      data: { source: "", target: "", payload: "Anaks" },
      id:
        "reactflow__edge-228d31c-3440-e33a-1ff2-167aa5ce84asource1-bfbe564-3e50-22fe-51c-5b4641a007target1"
    }
  ]
];

const elementReducer = (state = initialElements, action) => {
  switch (action.type) {
    case actionTypes.SET_ELEMENTS:
      return { counter: state.counter + action.payload };
    default:
      return state;
  }
};

export default elementReducer;
