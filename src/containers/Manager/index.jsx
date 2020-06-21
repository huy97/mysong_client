import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from 'components/Manager/Dashboard';

export class Manager extends Component {
    render() {
        return (
            <Dashboard/>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(Manager);
