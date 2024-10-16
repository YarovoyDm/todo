import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TODO } from "constants/todo";
import { ITodo, Todos } from "types/todo";

const initialTodosState = {
    todos: [],
} as Todos;

const todosSlice = createSlice({
    name: TODO,
    initialState: initialTodosState,
    reducers: {
        fetchTodosList(state: Todos, action) {
            state.todos = action.payload;
        },
        updateTodo(
            state: Todos,
            action: PayloadAction<{
                id: number;
                title: string;
                description: string;
                status: string;
                userId: string;
            }>,
        ) {
            const updatedTodo = action.payload;
            const index = state.todos.findIndex(
                todo => todo.id === updatedTodo.id,
            );

            if (index !== -1) {
                state.todos[index] = {
                    ...state.todos[index],
                    ...updatedTodo,
                };
            }
        },
        updateTodoStatus(
            state: Todos,
            action: PayloadAction<{ id: number; status: string }>,
        ) {
            const { id, status } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);

            if (todo) {
                todo.status = status;
            }
        },
        removeTodo(state: Todos, action: PayloadAction<number>) {
            state.todos = state.todos.filter(
                todo => todo.id !== action.payload,
            );
        },
        addTodo(state: Todos, action: PayloadAction<ITodo>) {
            state.todos.push(action.payload);
        },
    },
});

export default todosSlice.reducer;
export const {
    updateTodoStatus,
    removeTodo,
    addTodo,
    updateTodo,
    fetchTodosList,
} = todosSlice.actions;
