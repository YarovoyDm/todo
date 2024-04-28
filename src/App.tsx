import React from 'react';
import styles from './App.module.scss';
import Todos from './containers/Todos/Todos';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <Todos />
        </div>
    );
};

export default App;
