import React, { Component } from 'react'
import { connect } from 'react-redux'

export class HomeContainer extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.authReducer
});

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
