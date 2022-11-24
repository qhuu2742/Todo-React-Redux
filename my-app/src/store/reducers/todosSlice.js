import { createSlice, nanoid } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [
      {
        id: 1,
        title: "Viec 1",
        completed: true,
      },
      {
        id: 2,
        title: "Viec 2",
        completed: false,
      },
    ],
  },
  reducers: {
    // addTodo: (state, action) => {
    //   state.allTodos.unshift({
    //     id: nanoid(),
    //     title: action.payload,
    //     completed: false,
    //   });
    // },
    addTodo: {
      reducer(state, action) {
        state.allTodos.unshift(action.payload);
      },
      prepare(title) {
        return {
          payload: {
            id: nanoid(),
            title,
            completed: false,
          },
        };
      },
    },

    changStatus(state, action) {
      const todoId = action.payload;
      state.allTodos = state.allTodos.map((todo) => {
        if (todo.id === todoId) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
    deleteTodo(state, action) {
      const todoId = action.payload;
      state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    },
  },
});

// Reducer
const todosReducer = todosSlice.reducer;

// Selector
export const todosSelector = (state) => state.todosReducer.allTodos;

// Action
export const { addTodo, changStatus,deleteTodo } = todosSlice.actions;
export default todosReducer;
