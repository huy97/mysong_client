import React from 'react';
import styles from './index.module.scss';

const SplashScreen = () => {
    return (
        <div className={styles['splash-screen']}>
            <div className={styles["splash-screen__loading"]}>
            <div className={styles["splash-screen__loading-icon"]} />
            <div className={styles["splash-screen__loading-wave"]} />
            </div>
        </div>
    )
}

export default SplashScreen;
