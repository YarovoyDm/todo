import React, { useEffect } from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";

import Todos from "./containers/Todos/Todos";
import API from "./axiosConfig";

function App() {
    const token = sessionStorage.getItem("accessToken");

    useEffect(() => {
        !token && API.post("/auth");
    }, [token]);

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
}

export default App;
