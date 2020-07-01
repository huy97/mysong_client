import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Slider from 'components/Slider';
import SwiperList from 'components/SwiperList';

export class Home extends Component {
    
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>mySong - Best music for everybody</title>
                </Helmet>
                <div style={{width: '100%'}}>
                    <Slider/>
                    <SwiperList title="MỚI PHÁT HÀNH"/>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default withRouter(connect(mapStateToProps)(Home))
