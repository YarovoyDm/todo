import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todos } from '../../types/todo';
import { TODO_SLICE_NAME } from '../../constants/todo';

const initialState = {
    todos: [],
    deletedTodos: [],
} as Todos;

const todoSlice = createSlice({
    name: TODO_SLICE_NAME,
    initialState,
    reducers: {
        addTodo: (state: Todos, action: PayloadAction<string>) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state: Todos, action: PayloadAction<number>) => {
            state.deletedTodos.push(state.todos[action.payload]);
            state.todos.splice(action.payload, 1);
        },
        editTodo: (
            state: Todos,
            action: PayloadAction<{ index: number; name: string }>,
        ) => {
            state.todos[action.payload.index] = action.payload.name;
        },
    },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;
