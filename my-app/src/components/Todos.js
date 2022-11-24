import React from "react";
import { useSelector } from "react-redux";
import { todosSelector } from "../store/reducers/todosSlice";
import TodoForm from "./TodoForm";
import { useDispatch } from "react-redux";
import { changStatus } from "../store/reducers/todosSlice";
import { deleteTodo } from "../store/reducers/todosSlice";

const Todos = () => {
  const todos = useSelector(todosSelector);

  const dispatch = useDispatch();

  const toggleTodoCompleted = (todoId) => {
    console.log(todoId);
    dispatch(changStatus(todoId));
  };

  const deleteSingleTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  return (
    <div className="todo-list">
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={toggleTodoCompleted.bind(this, todo.id)}
            />
            <button onClick={deleteSingleTodo.bind(this, todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
