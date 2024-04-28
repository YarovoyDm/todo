import Todo from '../Todo/Todo';

import styles from './TodoList.module.scss';

const TodoList = ({
    todos,
    deleted,
}: {
    todos: Array<string>;
    deleted?: boolean;
}) => {
    return (
        <div className={styles.todosContainer}>
            {todos.length ? (
                todos.map(
                    (item: string, index: number): React.ReactElement => (
                        <Todo
                            deleted={deleted}
                            name={item}
                            index={index}
                            key={item}
                        />
                    ),
                )
            ) : (
                <div className={styles.emptyData}>There is no any task :(</div>
            )}
        </div>
    );
};

export default TodoList;
