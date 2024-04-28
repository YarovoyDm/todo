import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { addTodo } from '../../store/slices/todoSlice';

import styles from './AddTodo.module.scss';

const AddTodo: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isAdding, setIsAdding] = useState(false);
    const [taskName, setTaskName] = useState('');

    const onAddingModeChange = (): void => {
        setIsAdding((prev) => !prev);
    };

    const onTaskNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const newValue = e.currentTarget.value;

        setTaskName(newValue);
    };

    const AddNewTask = (): void => {
        dispatch(addTodo(taskName));
        onAddingModeChange();
        setTaskName('');
    };

    return (
        <div className={styles.addTodoContainer}>
            {isAdding ? (
                <div className={styles.wrapper}>
                    <input
                        value={taskName}
                        onChange={onTaskNameChange}
                        placeholder="Task name..."
                    />
                    <div className={styles.buttonsBlock}>
                        <button
                            disabled={!taskName.length}
                            onClick={() => AddNewTask()}
                        >
                            Add
                        </button>
                        <button onClick={() => onAddingModeChange()}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button onClick={() => onAddingModeChange()}>
                    ADD A NEW TASK
                </button>
            )}
        </div>
    );
};

export default AddTodo;
