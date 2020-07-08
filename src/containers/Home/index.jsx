import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Slider from 'components/Slider';
import SwiperList from 'components/SwiperList';
import List from 'components/List';
import ListItem from 'components/List/ListItem';
import Popover from 'components/Popover';
import { FiMoreHorizontal, FiPlay, FiPause, FiPlus } from 'react-icons/fi';

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
                                <div className="list-song">
                                    <div className="list-song_thumb">
                                        <img src={item.thumbnail} alt={item.title}/>
                                        <div className="list-song_thumb_hover"></div>
                                        <FiPlay className="list-song_thumb_icon" fill={'#fff'} stroke={0}/>
                                        {/* <FiPause className="list-song_thumb_icon" fill={'#fff'} stroke={0}/> */}
                                    </div>
                                    <div className="list-song_info">
                                        <div className="title">
                                            <a href="/" title={item.title}>{item.title}</a>
                                        </div>
                                        <div className="artist">
                                            <a href="/" title={item.artistName}>{item.artistName}</a>
                                        </div>
                                    </div>
                                    <div className="list-song_action">
                                        <Popover mouse="left" content={<div>Hihi</div>}>
                                            <button className="info">
                                                <FiMoreHorizontal/>
                                            </button>
                                        </Popover>
                                    </div>
                                </div>
                            )
                        }}/>
                    </List>
                    <div className="text-right">
                        <a href="/">Xem thêm...</a>
                    </div>
                    <div className="main-title">
                        <h1>THỂ LOẠI</h1>
                    </div>
                    <div className="main-title">
                        <h1>NGHỆ SĨ</h1>
                    </div>
                    <List grid={5}>
                        <ListItem render={(item) => {
                            return (
                                <div className="list-artist">
                                    <div className="list-artist_thumb">
                                        <img src={item.thumbnail} alt={item.title}/>
                                    </div>
                                    <div className="list-artist_info">
                                        <div className="artist">
                                            <a href="/" title={item.artistName}>{item.artistName}</a>
                                        </div>
                                        <button className="btn btn-sm" style={{height: 25, backgroundColor: "#ddd", lineHeight: "20px"}}>
                                            <span className="btn-icon">
                                                <FiPlus/>
                                            </span>
                                            <span>Theo dõi</span>
                                        </button>
                                    </div>
                                </div>
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
