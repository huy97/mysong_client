import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Manager extends Component {
    render() {
        return (
            <div>
                Manager
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(Manager);
