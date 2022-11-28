import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// Reducer Thunk
export const getTodos = createAsyncThunk("todos/todosFetched", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=3"
  );
  return response.data;
});

export const addTodo = createAsyncThunk("todos/todoAdded", async (title) => {
  const newTodo = {
    id: nanoid(),
    title,
    completed: false,
  };
  await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
  return newTodo;
});

export const deleteTodo = createAsyncThunk(
  "todos/todoDeleted",
  async (todoId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    return todoId;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    allTodos: [],
  },

  reducers: {
    // addTodo: (state, action) => {
    //   state.allTodos.unshift({
    //     id: nanoid(),
    //     title: action.payload,
    //     completed: false,
    //   });
    // },
    // addTodo: {
    //   reducer(state, action) {
    //     state.allTodos.unshift(action.payload);
    //   },
    //   prepare(title) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         completed: false,
    //       },
    //     };
    //   },
    // },

    changStatus(state, action) {
      const todoId = action.payload;
      state.allTodos = state.allTodos.map((todo) => {
        if (todo.id === todoId) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },

    // deleteTodo(state, action) {
    //   const todoId = action.payload;
    //   state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    // },

    // todosFetched(state, action) {
    //   state.allTodos = action.payload;
    // },
  },
  // extraReducers: {
  //   [getTodos.pending]: (state, action) => {
  //     console.log("fetching...");
  //   },
  //   [getTodos.fulfilled]: (state, action) => {
  //     console.log("done");
  //     state.allTodos = action.payload;
  //   },
  //   [getTodos.rejected]: (state, action) => {
  //     console.log("fail");
  //   },
  // },

  extraReducers: (builder) => {
    builder
      // Get all todos
      .addCase(getTodos.pending, (state, action) => {
        console.log("fetching");
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        console.log("done");
        state.allTodos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        console.log("fail");
      })

      // Add todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.allTodos.unshift(action.payload);
      })

      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const todoId = action.payload;
        state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
      });
  },
});

// Async action creator, action, and reducer dispatch
// hai cách dưới đây là cách cũ

// export const getTodos = () => {
//   const getTodosAsync = async (dispatch) => {
//     try {
//       const response = await axios.get(
//         "https://jsonplaceholder.typicode.com/todos?_limit=3"
//       );
//       dispatch(todosFetched(response.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return getTodosAsync;
// };

// export const getTodos = () => async (dispatch) => {
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/todos?_limit=3"
//     );
//     dispatch(todosFetched(response.data));
//   } catch (error) {
//     console.log(error);
//   }
// };

// Reducer
const todosReducer = todosSlice.reducer;

// Selector
export const todosSelector = (state) => state.todosReducer.allTodos;

// Action
export const { changStatus } = todosSlice.actions;

export default todosReducer;
