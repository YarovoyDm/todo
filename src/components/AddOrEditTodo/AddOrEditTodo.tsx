import React, { useCallback, useState } from "react";
import cn from "classnames";
import { addNewTodo } from "api/addNewTodo";
import { updateTodoById } from "api/updateTodoById";
import { useAppDispatch } from "store";
import { addTodo, updateTodo } from "store/slices/todoSlice";
import { ITodo } from "types/todo";

import styles from "./AddOrEditTodo.module.scss";

type IProps = {
    onModalChange: () => void;
    setTodoForEditing: (todo: null) => void;
    todo: ITodo | null;
};

const AddOrEditTodo = ({ onModalChange, setTodoForEditing, todo }: IProps) => {
    const dispatch = useAppDispatch();
    const [values, setValues] = useState({
        input: todo?.title ?? "",
        textarae: todo?.description ?? "",
    });

    const onInputChange = (e: React.SyntheticEvent<Element, Event>) => {
        const target = e.currentTarget as
            | HTMLInputElement
            | HTMLTextAreaElement;

        setValues(prev => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const closeModal = useCallback(() => {
        onModalChange();
        setValues({ input: "", textarae: "" });
        setTodoForEditing(null);
    }, [onModalChange, setTodoForEditing]);

    const onDoneButtonClick = useCallback(() => {
        onModalChange();
        setValues({ input: "", textarae: "" });
        setTodoForEditing(null);
        if (todo) {
            updateTodoById(todo.id, {
                title: values.input,
                description: values.textarae,
            }).then(res => dispatch(updateTodo(res)));

            return;
        }
        addNewTodo({ title: values.input, description: values.textarae }).then(
            res => dispatch(addTodo(res)),
        );
    }, [onModalChange, setTodoForEditing, values.input, values.textarae]);

    return (
        <div className={styles.modal}>
            <input
                name='input'
                placeholder='Title'
                value={values.input}
                onChange={onInputChange}
            />
            <textarea
                onChange={onInputChange}
                name='textarae'
                placeholder='Description'
                value={values.textarae}
            />
            <div className={styles.actionButtons}>
                <button onClick={closeModal} className={styles.button}>
                    Cancel
                </button>
                <button
                    onClick={onDoneButtonClick}
                    className={cn(styles.button, {
                        [styles.disabled]: !values.input || !values.textarae,
                    })}
                    disabled={!values.input || !values.textarae}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default AddOrEditTodo;
