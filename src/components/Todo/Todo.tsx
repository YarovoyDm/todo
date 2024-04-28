import React, { useState } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '../../store';
import { deleteTodo, editTodo } from '../../store/slices/todoSlice';

import styles from './Todo.module.scss';

const Todo = ({
    name,
    index,
    deleted,
}: {
    name: string;
    index: number;
    deleted?: boolean;
}) => {
    const dispatch = useAppDispatch();
    const [taskName, setTaskName] = useState(name);
    const [isEdit, setIsEdit] = useState(false);

    const deleteTask = (): void => {
        dispatch(deleteTodo(index));
    };

    const onEditModeChange = (): void => {
        setIsEdit((prev) => !prev);
    };

    const onTaskNameEdit = (e: React.FormEvent<HTMLInputElement>): void => {
        const newValue = e.currentTarget.value;

        setTaskName(newValue);
    };

    const saveEditedTask = (): void => {
        dispatch(editTodo({ index: index, name: taskName }));
    };

    return (
        <div className={styles.todoWrapper}>
            {isEdit ? (
                <div className={styles.editWrapper}>
                    <input value={taskName} onChange={onTaskNameEdit} />
                    <button onClick={() => saveEditedTask()}>Save</button>
                    <button onClick={() => onEditModeChange()}>Cancel</button>
                </div>
            ) : (
                <div className={cn(styles.todo, { [styles.deleted]: deleted })}>
                    {name}
                    <div className={styles.buttonsWrapper}>
                        <button onClick={() => onEditModeChange()}>Edit</button>
                        <button onClick={() => deleteTask()}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
