import React from 'react';
import styles from './index.module.scss';

const NotFound = () => {
    return (
        <div className={styles.wrapper}>
            <h1>404</h1>
            <h3>Opps. Trang bạn đang truy cập không tồn tại</h3>
        </div>
    )
}

export default NotFound;