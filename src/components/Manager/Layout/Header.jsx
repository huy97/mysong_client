import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Avatar, Row, Col, Badge, Menu, Dropdown, Space} from 'antd';
import 'antd/dist/antd.min.css';
import { BellOutlined } from '@ant-design/icons';
import { getCDN } from 'utils';
import { Helmet } from 'react-helmet';

export class Header extends Component {

    notification = () => {
        return (
            <Menu style={{minWidth: 200, padding: 5}}>
                <Menu.Item key="0">
                <a href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        const {auth: {
                userInfo
            }} = this.props;
        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>mySong - Best music for everybody | Admin Cpanel</title>
                </Helmet>
                <Layout.Header
                    style={{
                        position: "fixed",
                        width: "100%",
                        height: 64,
                        backgroundColor: "#ffffff",
                        boxShadow: "#ddd 0 0 5px",
                        zIndex: 9
                    }}>
                <Row>
                    <Col flex={1}>
                        <div className="manager-logo">
                            <span>mySong</span>
                        </div>
                    </Col>
                    <Col>
                        <Space direction="horizontal" size={30}>
                            <Dropdown overlay={this.notification} trigger={['click']} placement="bottomRight" overlayStyle={{position: "fixed"}}>
                                <Badge count={10}>
                                <Avatar
                                    size={35}
                                    icon={<BellOutlined style={{fontSize: 18}}/>}
                                    style={{
                                        color: "#000000",
                                        backgroundColor: '#fff'
                                    }}/>
                                </Badge>
                            </Dropdown>
                            <Dropdown overlay={this.notification} trigger={['click']} placement="bottomRight" overlayStyle={{position: "fixed"}}>
                                <Avatar
                                    size={35}
                                    style={{
                                        color: '#f56a00',
                                        backgroundColor: '#fde3cf'
                                    }} src={getCDN(userInfo.info.avatar)}/>
                            </Dropdown>
                        </Space>
                    </Col>
                </Row>
                </Layout.Header>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({auth: state.authReducer});

export default connect(mapStateToProps)(Header);
