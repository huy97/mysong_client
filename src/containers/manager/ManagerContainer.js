import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.min.css';

export class ManagerContainer extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(ManagerContainer)
