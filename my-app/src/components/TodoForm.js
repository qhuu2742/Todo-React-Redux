import React, { useState } from "react";
import { addTodo } from "../store/reducers/todosSlice";
import { useDispatch } from "react-redux";
import "./TodoForm.css"

const TodoForm = () => {
  const [title, setTitle] = useState("");

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const dispatch = useDispatch();

  const addSingleTodo = (event) => {
    event.preventDefault();
    dispatch(addTodo(title));
    setTitle("");
  };
  return (
    <div>
      <form onSubmit={addSingleTodo}>
        <input type="text" value={title} onChange={changeTitle} />
        <input className="add-button" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default TodoForm;
