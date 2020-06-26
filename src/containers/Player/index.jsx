import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Player.module.scss'
import { FiPlay, FiSkipBack, FiSkipForward, FiPause, FiHeart, FiVolume2, FiShuffle, FiRepeat } from 'react-icons/fi';
import { RiPlayListLine} from 'react-icons/ri';

export class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: true
        }
    }
    render() {
        const {playing} = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.control}>
                        <button className={styles.control_button}>
                            <FiSkipBack size={20} strokeWidth={1.5} />
                        </button>
                        <button className={styles.control_button}>
                            {playing ? 
                                <FiPause size={36} strokeWidth={1.5} />
                                :
                                <FiPlay size={36} strokeWidth={1.5} />
                            }
                        </button>
                        <button className={styles.control_button}>
                            <FiSkipForward size={20} strokeWidth={1.5} />
                        </button>
                        <button className={styles.control_button}>
                            <FiShuffle size={20} strokeWidth={1.5} />
                        </button>
                        <button className={styles.control_button}>
                            <FiRepeat size={20} strokeWidth={1.5} />
                        </button>
                        <button className={styles.control_button}>
                            <FiHeart size={20} strokeWidth={1.5} />
                        </button>
                        <button className={styles.control_button}>
                            <FiVolume2 size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                    <div className={styles.song}>
                        <div className={styles.song_thumb}>
                            <img src="https://picsum.photos/50/50" alt="Song"/>
                        </div>
                        <div className={styles.song_info}>
                            <div className={styles.song_info_title}>
                                <span className={styles.song_info_title_content}>Em không sai, chúng ta sai</span>
                                <span className={styles.song_info_title_artist}>Huy Le</span>
                            </div>
                            <div className={styles.song_info_duration}>
                                <span className={styles.song_info_duration_time}>03:59 / 03:59</span>
                                <div className={styles.song_info_duration_playing}></div>
                                <div className={styles.song_info_duration_loaded}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.border}></div>
                    <div className={styles.btn_playlist}>
                        <button className="btn btn-sm btn-primary">
                            <span className="menu-icon">
                                <RiPlayListLine size={18}/>
                            </span>
                            <span>Danh sách phát</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps)(Player);
