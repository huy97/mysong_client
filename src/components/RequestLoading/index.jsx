import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export class RequestLoading extends Component {
    render() {
        const {loadingBar} = this.props;
        if(loadingBar.default)
            return (
                <Spin style={{position: "fixed", right: 10, top: 74}} indicator={<LoadingOutlined style={{fontSize: 20, color: "#f11946"}}/>}></Spin>
            )
        return null;
    }
}

const mapStateToProps = (state) => ({
    loadingBar: state.loadingBar
});

export default connect(mapStateToProps)(RequestLoading);
