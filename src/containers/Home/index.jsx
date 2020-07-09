import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Slider from 'components/Slider';
import SongSlider from 'components/SongSlider';
import List from 'components/List';
import ListItem from 'components/List/ListItem';
import Popover from 'components/Popover';
import { FiMoreHorizontal, FiPlay, FiPause, FiPlus } from 'react-icons/fi';
import { RiPlayListAddLine, RiHeartLine, RiShareLine, RiHeadphoneLine, RiChat1Line } from 'react-icons/ri';

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
                    <SongSlider title="MỚI PHÁT HÀNH"/>
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
                                        <Popover style={{width: 280}} mouse="left" content={
                                            <div>
                                                <div className="list-song_action_detail">
                                                    <div className="thumb">
                                                        <img src={item.thumbnail} alt={item.title}/>
                                                    </div>
                                                    <div className="title">
                                                        <b>{item.title}</b>
                                                        <div className="statistic">
                                                            <div>
                                                                <span className="menu-icon">
                                                                    <RiHeartLine/>
                                                                </span>
                                                                <span>20k</span>
                                                            </div>
                                                            <div>
                                                                <span className="menu-icon">
                                                                    <RiHeadphoneLine/>
                                                                </span>
                                                                <span>100k</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul className="list-action">
                                                    <li className="list-action_item">
                                                        <span className="menu-icon">
                                                            <RiHeartLine/>
                                                        </span>
                                                        <span>
                                                            Yêu thích
                                                        </span>
                                                    </li>
                                                    <li className="list-action_item">
                                                        <span className="menu-icon">
                                                            <RiPlayListAddLine/>
                                                        </span>
                                                        <span>
                                                            Thêm vào danh sách phát
                                                        </span>
                                                    </li>
                                                    <li className="list-action_item">
                                                        <span className="menu-icon">
                                                            <RiChat1Line/>
                                                        </span>
                                                        <span>
                                                            Bình luận
                                                        </span>
                                                    </li>
                                                    <li className="list-action_item">
                                                        <span className="menu-icon">
                                                            <RiShareLine/>
                                                        </span>
                                                        <span>
                                                            Chia sẻ
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        }>
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
                                        <span className="follow">100k theo dõi</span>
                                        <button className="btn btn-sm" style={{height: 25, backgroundColor: "#f1f1f1", lineHeight: "20px"}}>
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
