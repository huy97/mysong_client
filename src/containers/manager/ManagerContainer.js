import React, { Component } from 'react'
import { connect } from 'react-redux'
import Can from "containers/ability/Can";
import {PERMISSION_CODE} from "constants/global";

export class ManagerContainer extends Component {
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

export default connect(mapStateToProps)(ManagerContainer)
