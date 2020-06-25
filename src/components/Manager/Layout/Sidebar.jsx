import React, {Component} from 'react';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import routes from 'routes/admin';
import {Link} from 'react-router-dom';

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

    render() {
        return (
            <Layout.Sider
                width={250}
                style={{
                    overflow: "hidden",
                    overflowY: "auto",
                    height: '100vh',
                    position: 'fixed',
                    paddingTop: 64,
                    left: 0
                }}>
                <Menu
                    selectedKeys={this.getSelectKey()}
                    mode="inline"
                    style={{
                        minHeight: '100%',
                        borderRight: 0
                    }}>
                    {
                        routes.map((route, key) => (
                            <Menu.Item key={key} icon={route.icon}>
                                <Link to={route.path}>{route.title}</Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Layout.Sider>
        )
    }
}

export default Sidebar;
