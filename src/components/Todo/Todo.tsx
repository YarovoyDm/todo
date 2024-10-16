import React, { useCallback, useMemo, useState } from "react";
import cn from "classnames";
import { deleteTodoById } from "api/deleteTodoById";
import { updateTodoStatusById } from "api/updateTodoStatusById";
import { TODO_STATUS_MAP } from "constants/todo";
import { DELETE, EDIT } from "constants/icons";
import { useAppDispatch } from "store";
import { removeTodo, updateTodoStatus } from "store/slices/todoSlice";
import { ITodo } from "types/todo";
import Icon from "../Icon/Icon";

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
                item => item.key === todoStatus.toLowerCase(),
            )[0].color,
        [TODO_STATUS_MAP, todoStatus],
    );

    const statusChange =
        ({ id, newStatus }: { id: number; newStatus: string }) =>
        () => {
            updateTodoStatusById({
                id,
                status: newStatus.toLowerCase().replace(/[\s']/g, ""),
            });
            dispatch(updateTodoStatus({ id, status: newStatus }));
            onTodoViewChange();
        };

    const deleteTodo = (id: number) => () => {
        deleteTodoById(id);
        dispatch(removeTodo(id));
    };

    const editTodo = useCallback(() => {
        setIsModalOpen(true);
        setTodoForEditing({
            id,
            title,
            description,
            status: todoStatus,
        });
    }, [setIsModalOpen, setTodoForEditing]);

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
                        const isSelected =
                            status.key === todoStatus.toLowerCase();

                        return (
                            <div
                                className={cn(styles.statusItem, {
                                    [styles.statusSelected]: isSelected,
                                })}
                                onClick={statusChange({
                                    id,
                                    newStatus: status.key,
                                })}
                                style={{
                                    background: isSelected
                                        ? status.color
                                        : "white",
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
