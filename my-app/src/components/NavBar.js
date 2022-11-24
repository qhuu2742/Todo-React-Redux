import React from "react";
import { useSelector } from "react-redux";
import  {todosSelector}  from "../store/reducers/todosSlice";

const NavBar = () => {
  const todos = useSelector(todosSelector);
  return (
    <div className="navbar">
      <h1>Redux App</h1>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Todo: {todos.length}</li>
      </ul>
    </div>
  );
};

export default NavBar;
