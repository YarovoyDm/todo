import React, { useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { TABS } from '../../constants/tabs';

import styles from './TodoTabs.module.scss';

type ITab = {
    tabUrl: string;
    tabName: string;
};

const TodoTabs: React.FC = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const onTabIndexChange = (index: number): void => {
        setSelectedTabIndex(index);
    };

    return (
        <div className={styles.tabWrapper}>
            {TABS.map((tab: ITab, index: number): React.ReactElement => {
                return (
                    <Link to={tab.tabUrl} key={tab.tabName}>
                        <button
                            onClick={() => onTabIndexChange(index)}
                            className={cn(styles.tabButton, {
                                [styles.selected]: index === selectedTabIndex,
                            })}
                        >
                            {tab.tabName}
                        </button>
                    </Link>
                );
            })}
        </div>
    );
};

export default TodoTabs;
