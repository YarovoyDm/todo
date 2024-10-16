import React, { useEffect, useState } from "react";
import background from "../../assets/background.png";

import styles from "./Todos.module.scss";
import Todo from "../../components/Todo/Todo";
import AddTodoButton from "../../components/AddTodoButton/AddTodoButton";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTodos } from "../../store/selectors/todos";
import AddOrEditTodo from "../../components/AddOrEditTodo/AddOrEditTodo";
import { ITodo } from "../../types/todo";
import axios from "axios";
import { addTodo, fetchTodosList } from "../../store/slices/todoSlice";
import { fetchTodos } from "../../api/fetchTodos";

const Todos = () => {
    const todos = useAppSelector(selectTodos);
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoForEditing, setTodoForEditing] = useState<ITodo | null>(null);

    const onModalChange = () => {
        setIsModalOpen(prev => !prev);
    };

    console.log("todos", todos);

    useEffect(() => {
        fetchTodos().then(res => {
            dispatch(fetchTodosList(res));
        });
    }, []);

    return (
        <div
            className={styles.todos}
            style={{ backgroundImage: `url(${background})` }}
        >
            {todos?.length ? (
                todos.map(todo => {
                    return (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            setTodoForEditing={setTodoForEditing}
                            setIsModalOpen={setIsModalOpen}
                        />
                    );
                })
            ) : (
                <div>No</div>
            )}
            {isModalOpen && (
                <AddOrEditTodo
                    onModalChange={onModalChange}
                    setTodoForEditing={setTodoForEditing}
                    todo={todoForEditing}
                />
            )}
            <AddTodoButton onClick={onModalChange} />
        </div>
    );
};

export default Todos;
