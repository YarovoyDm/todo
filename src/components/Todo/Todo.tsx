import React, { useMemo, useState } from "react";

import { DELETE, EDIT } from "../../constants/icons";
import Icon from "../Icon/Icon";
import { TODO_STATUS_MAP } from "../../constants/todo";
import { ITodo } from "../../types/todo";
import { useAppDispatch } from "../../store";
import { removeTodo, updateTodoStatus } from "../../store/slices/todoSlice";
import { deleteTodoById } from "../../api/deleteTodoById";
import { updateTodoStatusById } from "../../api/updateTodoStatusById";

import styles from "./Todo.module.scss";

type IProps = {
    todo: ITodo;
    setTodoForEditing: (todo: ITodo) => void;
    setIsModalOpen: (isOpen: boolean) => void;
};

const Todo = ({
    todo: { id, title, description, status: todoStatus },
    setTodoForEditing,
    setIsModalOpen,
}: IProps) => {
    const [isTodoUnroll, setIsTodoUnroll] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onTodoViewChange = () => {
        setIsTodoUnroll(prev => !prev);
    };

    const getCurrentStatusColor = useMemo(
        () =>
            TODO_STATUS_MAP.filter(
                item => item.name.toLowerCase() === todoStatus.toLowerCase(),
            )[0].color,
        [TODO_STATUS_MAP, todoStatus],
    );

    const statusChange =
        ({ id, newStatus }: { id: number; newStatus: string }) =>
        () => {
            updateTodoStatusById({ id, status: newStatus.toLowerCase() });
            dispatch(updateTodoStatus({ id, status: newStatus }));
            onTodoViewChange();
        };

    const deleteTodo = (id: number) => () => {
        deleteTodoById(id);
        dispatch(removeTodo(id));
    };

    const editTodo = () => {
        setIsModalOpen(true);
        setTodoForEditing({
            id,
            title,
            description,
            status: todoStatus,
        });
    };

    return (
        <div className={styles.todo}>
            <div className={styles.mainInfoWrapper}>
                <div className={styles.todoMainInfo} onClick={onTodoViewChange}>
                    <div className={styles.todoName}>{title}</div>
                    <div className={styles.todoDesription}>{description}</div>
                </div>
                <div className={styles.actions}>
                    <Icon name={EDIT} onClick={() => editTodo()} />
                    <Icon name={DELETE} onClick={deleteTodo(id)} />
                </div>
                <div
                    className={styles.miniStatus}
                    style={{ background: getCurrentStatusColor }}
                />
            </div>
            {isTodoUnroll && (
                <div className={styles.statusesWrapper}>
                    {TODO_STATUS_MAP.map(status => {
                        const newBackground =
                            status.name.toLowerCase() ===
                            todoStatus.toLowerCase()
                                ? status.color
                                : "white";

                        return (
                            <div
                                className={styles.statusItem}
                                onClick={statusChange({
                                    id,
                                    newStatus: status.name,
                                })}
                                style={{
                                    background: newBackground,
                                    border: `solid 1px ${status.color}`,
                                }}
                            >
                                {status.name}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Todo;
