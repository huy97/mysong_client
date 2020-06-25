import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Header.module.scss';
import { getCDN } from 'utils';
import { FiLock, FiUser, FiSearch, FiBell, FiArrowUpLeft } from 'react-icons/fi';
import { withRouter, Link } from 'react-router-dom';
import { get } from 'lodash';
import { RiVipCrownLine } from 'react-icons/ri';

export class Header extends Component {
    render() {
        const {auth, history} = this.props;
        const returnUrl = get(history, 'location.pathname', "");
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <span>mySong</span>
                    </div>
                    <nav>
                        <div className={styles.searchBox}>
                            <div className={styles.searchBox_icon}>
                                <span>
                                    <FiSearch size={24}/>
                                </span>
                            </div>
                            <div className={styles.searchBox_input}>
                                <input type="text" placeholder="Nhập tên bài hát, ca sĩ..."/>
                            </div>
                            <div className={styles.searchBox_content}>
                                <div className={styles.searchBox_content__item}>
                                    <div className={styles.searchBox_content__item_title}>
                                        <b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, velit praesentium facilis libero voluptas error repudiandae doloribus debitis. Accusantium earum nulla est blanditiis libero nesciunt corporis deleniti, veritatis dignissimos quis?</b>
                                    </div>
                                    <div className={styles.searchBox_content__item_icon}>
                                        <span>
                                            <FiArrowUpLeft size={24}/>
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.searchBox_content__item}>
                                    <div className={styles.searchBox_content__item_title}>
                                        <b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, velit praesentium facilis libero voluptas error repudiandae doloribus debitis. Accusantium earum nulla est blanditiis libero nesciunt corporis deleniti, veritatis dignissimos quis?</b>
                                    </div>
                                    <div className={styles.searchBox_content__item_icon}>
                                        <span>
                                            <FiArrowUpLeft size={24}/>
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.searchBox_content__item}>
                                    <div className={styles.searchBox_content__item_title}>
                                        <b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, velit praesentium facilis libero voluptas error repudiandae doloribus debitis. Accusantium earum nulla est blanditiis libero nesciunt corporis deleniti, veritatis dignissimos quis?</b>
                                    </div>
                                    <div className={styles.searchBox_content__item_icon}>
                                        <span>
                                            <FiArrowUpLeft size={24}/>
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.searchBox_content__item}>
                                    <div className={styles.searchBox_content__item_title}>
                                        <b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, velit praesentium facilis libero voluptas error repudiandae doloribus debitis. Accusantium earum nulla est blanditiis libero nesciunt corporis deleniti, veritatis dignissimos quis?</b>
                                    </div>
                                    <div className={styles.searchBox_content__item_icon}>
                                        <span>
                                            <FiArrowUpLeft size={24}/>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className={styles.menu}>
                        {auth.isLoggedIn ?
                            <div className={styles.menu}>
                                { !auth.userInfo.info.isVip ?
                                    <div className={styles.menuItem}>
                                        <button className="btn btn-orange">
                                            <span className="btn-icon"><RiVipCrownLine size={16}/></span>
                                            <span>NÂNG CẤP VIP</span>
                                        </button>
                                    </div>
                                    : null
                                }
                                <div className={styles.menu_item}>
                                    <div className={styles.avatar} style={{backgroundColor: '#ffffff'}}>
                                        <div className={styles.badge}>
                                            <span>100</span>
                                        </div>
                                        <span>
                                            <FiBell size={24}/>
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.menu_item}>
                                    <div className={styles.avatar}>
                                        {auth.userInfo.info.avatar ? 
                                            <img src={getCDN(auth.userInfo.info.avatar)} alt="Avatar"/>
                                            :
                                            <span>
                                                <FiUser size={24}/>
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <Link to={`/login?returnUrl=${returnUrl}`}>
                                <button className="btn btn-primary">
                                    <span className="btn-icon"><FiLock size={16}/></span>
                                    <span>Đăng nhập</span>
                                </button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.authReducer
});
export default withRouter(connect(mapStateToProps)(Header));
