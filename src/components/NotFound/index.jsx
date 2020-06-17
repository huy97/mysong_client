import React from 'react';
import styles from './index.module.scss';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={styles.wrapper}>
            <h1>404</h1>
            <h3>Opps. Trang bạn đang truy cập không tồn tại</h3>
            <Link to={'/'}>
                <button className={'btn'} >Trang chủ</button>
            </Link>
        </div>
    )
}

export default NotFound;
