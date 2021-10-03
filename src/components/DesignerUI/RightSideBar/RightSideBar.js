import React, { useState, useContext, Fragment } from "react";
import StoreContext from "../../../context/Store";

import "./RightBar.css";

const RightSideBar = () => {
  const { elements } = useContext(StoreContext);
  //const [viewJson, setViewJson] = useState(false);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Fragment>
      <div className="rightBarFlow ">
        <aside>

        </aside>
      </div>
    </Fragment>
  );
};

export default RightSideBar;
