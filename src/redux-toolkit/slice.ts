import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Todo } from "@/types/todo";

export interface TodoState {
    todos: Todo[];
}

export const initialState: TodoState = {
    todos: [
        { id: 1, text: 'Apprendre React', completed: false },
        { id: 2, text: 'Apprendre TypeScript', completed: false },
        { id: 3, text: 'Créer une application Todo', completed: false },
    ]
};


const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;