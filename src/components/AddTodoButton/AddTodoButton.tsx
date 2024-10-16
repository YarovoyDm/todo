import React from "react";
import { ADD } from "constants/icons";
import Icon from "../Icon/Icon";

import styles from "./AddTodoButton.module.scss";

type IProps = {
    onClick?: () => void;
};

const AddTodoButton = (props: IProps) => {
    return (
        <div className={styles.addTodoButton} {...props}>
            <Icon name={ADD} />
        </div>
    );
};

export default AddTodoButton;
