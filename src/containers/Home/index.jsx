import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Home extends Component {
    render() {
        return (
            <div>
                Home
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(Home)
