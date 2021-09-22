import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import StoreContext from "../context/Store";
import { config } from "localforage";
const DrawerBar = styled.div`
  background: gainsboro;
  padding: 8px 10px;
  font-size: 14px;
  min-width: 200px;
  max-width: 200px;
  position: absolute;
  top: 3%;
  right: 0;
  z-index: 6;
  height: 100%;
  overflow: auto;
  resize: horizontal;
  box-shadow: -5px 3px 29px -6px rgba(173, 163, 173, 1);
`;

export default function Drawer({ show }) {
  const { elements, setElements } = useContext(StoreContext);

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [configuration, setConfiguration] = useState({
    name: "",
    targetCount: 2,
    sourceCount: 1
  });
  const positionHandle = (e, id) => {
    const { name, value } = e.target;
    setPosition(e.target.value);
    setPosition({
      ...position,
      [name]: value
    });
    console.log(position);

    setElements((els) => {
      const nextElements = els.map((el) => {
        if (el.id !== id) {
          return el;
        } else {
          return {
            ...el,
            position: {
              ...el.position,
              [name]: value
            }
          };
        }
      });
      return nextElements;
    });
  };

  useEffect(() => {
    if (show.node.position !== undefined) {
      setPosition({
        x: show.node.position.x,
        y: show.node.position.y
      });
    }
  }, [show.node.position]);

  const submitHandle = (e) => {
    e.preventDefault();
    updateNodeInformation(configuration);
  };
  const changeHandle = (e) => {
    setConfiguration({
      ...configuration,
      [e.target.name]: e.target.value
    });
  };
  const updateNodeInformation = (configuration) => {
    setElements((elements) => {
      return elements.map((els) => {
        if (els.id === show.node.id) {
          return {
            ...els,
            data: {
              ...els.data,
              label: configuration.name,
              targetCount: configuration.targetCount,
              sourceCount: configuration.sourceCount
            }
          };
        } else {
          return els;
        }
      });
    });
  };

  return (
    <>
      <DrawerBar hidden={show.enable || false}>
        {show.node.position !== undefined && (
          <div>
            <p>Id: {show.node.id || ""}</p>
            <p>Type: {show.node.type || ""}</p>
            <p>Label: {show.node.data.label || ""}</p>
            <p>Position</p>
            <p>x = {show.node.position.x.toFixed(1)}</p>
            <p>y = {show.node.position.y.toFixed(1)}</p>
            <div>
              <label>X: </label>
              <input
                name="x"
                value={position.x}
                type="number"
                onChange={(e) => positionHandle(e, show.node.id)}
              />
              <br />
              <label>y: </label>
              <input
                name="y"
                value={position.y}
                type="number"
                onChange={(e) => positionHandle(e, show.node.id)}
              />
            </div>
            <form onSubmit={submitHandle}>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                value={configuration.name}
                onChange={changeHandle}
              />
              <label>Target Count: </label>
              <input
                type="number"
                name="targetCount"
                value={configuration.targetCount}
                onChange={changeHandle}
              />
              <label>Source Count: </label>
              <input
                type="number"
                name="sourceCount"
                value={configuration.sourceCount}
                onChange={changeHandle}
              />
              <button type="submit">Kaydet</button>
            </form>
          </div>
        )}
      </DrawerBar>
    </>
  );
}
