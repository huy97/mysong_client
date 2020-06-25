import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Sidebar.module.scss';
import { RiHome2Line, RiAwardLine, RiMovie2Line, RiUserStarLine, RiStackLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import routes from 'routes/user';
import { FiActivity } from 'react-icons/fi';

export class Sidebar extends Component {
    getSelectKey = () => {
        const {history} = this.props;
        let routeIndex = routes.findIndex(
            (route) => route.path === history.location.pathname
        );
        if (routeIndex !== -1) 
            return routeIndex.toString();
        return "";
    }

    getActiveClass = (path) => {
        let className = styles.menu_item;
        const {history} = this.props;
        if(path === history.location.pathname){
            className += ' ' + styles.active;
        }
        return className;
    }
    
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.menu}>
                    <div className={this.getActiveClass('/')}>
                        <div className={styles.menu_item_icon}>
                            <span>
                                <RiHome2Line size={18}/>
                            </span>
                        </div>
                        <Link to="/">
                            <span>
                                Trang chủ
                            </span>
                        </Link>
                    </div>
                    <div className={this.getActiveClass('/mv')}>
                        <div className={styles.menu_item_icon}>
                            <span>
                                <FiActivity size={18}/>
                            </span>
                        </div>
                        <Link to="/moi-phat-hanh">
                            <span>
                                Mới phát hành
                            </span>
                        </Link>
                    </div>
                    <div className={this.getActiveClass('/mv')}>
                        <div className={styles.menu_item_icon}>
                            <span>
                                <RiAwardLine size={18}/>
                            </span>
                        </div>
                        <Link to="/top-100">
                            <span>
                                TOP 100
                            </span>
                        </Link>
                    </div>
                    <div className={this.getActiveClass('/mv')}>
                        <div className={styles.menu_item_icon}>
                            <span>
                                <RiMovie2Line size={18}/>
                            </span>
                        </div>
                        <Link to="/mv">
                            <span>
                                MV
                            </span>
                        </Link>
                    </div>
                    <div className={this.getActiveClass('/mv')}>
                        <div className={styles.menu_item_icon}>
                            <span>
                                <RiStackLine size={18}/>
                            </span>
                        </div>
                        <Link to="/mv">
                            <span>
                                Thể loại
                            </span>
                        </Link>
                    </div>
                    <div className={this.getActiveClass('/mv')}>
                        <div className={styles.menu_item_icon}>
                            <span>
                                <RiUserStarLine size={18}/>
                            </span>
                        </div>
                        <Link to="/mv">
                            <span>
                                Ca sĩ
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(Sidebar);
