import { Handle, getOutgoers } from "react-flow-renderer";
import { NodeWrapper, InputLabel } from "./styles";
import React, { useCallback, useContext, useEffect, useState } from "react";
import StoreContext from "../../context/Store";
import useDidMountEffect from "../../hooks/useDidMountEffect";
const SplitNode = (self) => {
  const { elements, setElements, nodeClass } = useContext(StoreContext);

  const [values, setValues] = useState([
    {
      source1: ""
    },
    {
      source2: ""
    },
    {
      source3: ""
    }
  ]);

  let outgoers = getOutgoers(self, elements);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues([{ [name]: Number(value) }]);
  };

  useDidMountEffect(() => {
    //const data = Object.values(values);
    nodeClass.doSplit(values, self, outgoers);
  }, [values]);

  return (
    <NodeWrapper>
      <InputLabel>{self.data.label}</InputLabel>
      <input
        name="source1"
        type="number"
        value={values["source1"]}
        className="nodrag nowheel"
        style={{ width: "30%" }}
        onChange={handleChange}
      />
      <input
        name="source2"
        type="number"
        value={values["source2"]}
        className="nodrag nowheel"
        style={{ width: "30%" }}
        onChange={handleChange}
      />
      <input
        name="source3"
        type="number"
        value={values["source3"]}
        className="nodrag nowheel"
        style={{ width: "30%" }}
        onChange={handleChange}
      />
      <Handle
        type="target"
        position="top"
        id="target1"
        style={{ left: "50%" }}
      />
      <Handle
        type="source"
        position="bottom"
        id="source1"
        style={{ left: "20%" }}
      />
      <Handle
        type="source"
        position="bottom"
        id="source2"
        style={{ left: "50%" }}
      />
      <Handle
        type="source"
        position="bottom"
        id="source3"
        style={{ left: "80%" }}
      />
    </NodeWrapper>
  );
};

export default SplitNode;
