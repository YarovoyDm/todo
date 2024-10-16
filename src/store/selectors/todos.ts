import { createSelector } from "@reduxjs/toolkit";
import { Todos } from "types/todo";
import { RootState } from "..";

export const selectStore = (state: RootState) => state.todos;

export const selectTodos = createSelector(
    selectStore,
    (state: Todos) => state.todos,
);
