import React from 'react';
import styles from './index.module.scss';
import {Link} from "react-router-dom";
import Helmet from 'react-helmet';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>404 Not Found</title>
            </Helmet>
            <div className={styles.container}>
                <h1>404</h1>
                <h3>Opps. Trang bạn đang truy cập không tồn tại</h3>
                <Link to={'/'}>
                    <button className={'btn'} >Trang chủ</button>
                </Link>
            </div>
        </>
    )
}

export default NotFound;
