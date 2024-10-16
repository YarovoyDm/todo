import React, { useState } from "react";
import Todo from "components/Todo/Todo";
import AddTodoButton from "components/AddTodoButton/AddTodoButton";
import AddOrEditTodo from "components/AddOrEditTodo/AddOrEditTodo";
import { useAppSelector } from "store";
import { selectTodos } from "store/selectors/todos";
import { ITodo } from "types/todo";

import styles from "./Todos.module.scss";

const Todos: React.FC = () => {
    const todos = useAppSelector(selectTodos);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todoForEditing, setTodoForEditing] = useState<ITodo | null>(null);

    const onModalChange = () => {
        setIsModalOpen(prev => !prev);
    };

    return (
        <div className={styles.todos}>
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
                <div className={styles.empty}>There is no todo yet :(</div>
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
