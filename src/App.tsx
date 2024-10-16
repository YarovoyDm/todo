import React, { useEffect } from "react";
import { registerUser } from "api/registerUser ";
import { fetchTodos } from "api/fetchTodos";
import Header from "components/Header/Header";
import Todos from "containers/Todos/Todos";
import { fetchTodosList } from "store/slices/todoSlice";
import { useAppDispatch } from "store";

import styles from "./App.module.scss";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const token = sessionStorage.getItem("accessToken");

    const performLoginAndFetchTodos = async () => {
        !token && (await registerUser());
        await fetchTodos().then(res => {
            dispatch(fetchTodosList(res));
        });
    };

    useEffect(() => {
        performLoginAndFetchTodos();
    }, [performLoginAndFetchTodos]);

    return (
        <div className={styles.App}>
            <div className={styles.desktopVersion}>
                Please, go to mobile version
            </div>
            <div className={styles.mobileVersion}>
                <Header />
                <Todos />
            </div>
        </div>
    );
};

export default App;
