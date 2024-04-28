import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TodoList from '../../components/TodoList/TodoList';
import AddTodo from '../../components/AddTodo/AddTodo';
import TodoTabs from '../../components/TodoTabs/TodoTabs';
import { RootState, useAppSelector } from '../../store';
import { Todos as ITodos } from '../../types/todo';

import styles from './Todos.module.scss';

const Todos: React.FC = () => {
    const allTodos = useAppSelector((state: RootState): ITodos => {
        return state.todo;
    });

    return (
        <div className={styles.todosPage}>
            <div className={styles.todosBlock}>
                <h1>TODO</h1>
                <TodoTabs />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <TodoList todos={allTodos.todos} />
                                <AddTodo />
                            </>
                        }
                    />
                    <Route
                        path="/deleted"
                        element={
                            <TodoList deleted todos={allTodos.deletedTodos} />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default Todos;
