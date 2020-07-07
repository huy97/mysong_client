import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Slider from 'components/Slider';
import SwiperList from 'components/SwiperList';
import List from 'components/List';
import ListItem from 'components/List/ListItem';
import Popover from 'components/Popover';

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
                    <List grid={3}>
                        <ListItem render={(item) => {
                            return (
                                <Popover content={<div>Hi</div>}>
                                    <div className="list-song">
                                        {item.thumbnail}
                                    </div>
                                </Popover>
                            )
                        }}/>
                    </List>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default withRouter(connect(mapStateToProps)(Home))
