import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import StoreContext from "../context/Store";
import Dropdown from "rc-dropdown";
import Menu, { Item as MenuItem } from "rc-menu";
export const TopMenuDiv = styled.div`
  background: white;
  text-decoration: none;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  font-size: 2vmin;
  /* padding: 10px; */
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 5;
  li {
    color: black;
    padding: 5px;
    user-select: none;
    position: relative;
    &:hover {
      color: red;
      transform: scale(1.1);
      cursor: grab;
    }
    &#fs {
      color: blue;
      border: 1px solid black;
    }
  }
`;

const Content = styled.div`
  display: ${(props) => props.display || "none"};
  position: absolute;
  left: 0;
  background-color: #f9f9f9;
  min-width: 60px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 6;
  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

export default function TopMenu() {
  const {
    elements,
    setElements,
    theme,
    setTheme,
    flagColor,
    setFlagColor
  } = useContext(StoreContext);
  const [contentDisplay, setcontentDisplay] = useState("none");
  const handleContentDisplay = () => {
    alert("naber");
    if (contentDisplay === "none") {
      setcontentDisplay("display");
    } else {
      setcontentDisplay("none");
    }
  };
  const handleFullScreen = () => {
    document.documentElement.requestFullscreen().catch(console.log);
  };
  const undoHandle = () => {
    //setElements((elements) => [...elements]);
  };
  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  const changeFlagColor = (e) => {
    setFlagColor(e.target.value);
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const menuItems = [
    <MenuItem
      key="1"
      onClick={() => alert("Hello Alvina")}
      style={{ background: "red" }}
    >
      1st item
    </MenuItem>,
    <MenuItem key="2">2nd item</MenuItem>
  ];
  const menu = (
    <Menu style={{ marginTop: "-1px", minWidth: "80px" }}>{menuItems}</Menu>
  );
  return (
    <TopMenuDiv>
      <li>
        File
        <Content display={contentDisplay}>
          <a href="#" onClick={handleContentDisplay}>
            Link 1
          </a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
          <a href="#">Link 4</a>
          <a href="#">Link 5</a>
        </Content>
      </li>
      <li>Edit</li>
      <li>View</li>
      <li>Devices</li>
      <li id="fs" onClick={handleFullScreen}>
        Full Screen
      </li>
      <li
        style={{ background: "gray", border: "1px solid blue", color: "white" }}
        onClick={console.clear}
      >
        Console Clear
      </li>
      <li
        style={{
          background: "green",
          border: "1px solid blue",
          color: "white"
        }}
        onClick={undoHandle}
      >
        Undo
      </li>
      <li onClick={changeTheme}>Change Theme</li>

      <Dropdown trigger={["click"]} overlay={menu}>
        <button>Actions</button>
      </Dropdown>
    </TopMenuDiv>
  );
}
