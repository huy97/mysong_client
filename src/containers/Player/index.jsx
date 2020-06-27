import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './Player.module.scss';
import {RiPlayListLine} from 'react-icons/ri';
import {REPEAT_TYPE} from 'constants/global';
import Control from './Control';
// import {getCDN} from 'utils';

export class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: {
                playing: false,
                canPlay: false,
                duration: 0,
                loadedPercent: 0,
                currentTime: 0,
                volume: 1,
                muteVolume: 0,
                mute: false,
                repeat: REPEAT_TYPE.REPEAT_OFF
            },
            song: {},
            onMouseHold: false
        }
        this.audio = new Audio();
        this.initPlayer();
    }

    componentDidMount() {
        let audio = 'http://mp3-s1-zmp3.zadn.vn/794df833e974002a5965/1153877562796251586?authen=exp' +
                '=1593417431~acl=/794df833e974002a5965/*~hmac=81017a74023118edf018566b7b81cf32';
        document.addEventListener('mousemove', this.handleSeekingMouseMove);
        document.addEventListener('mouseup', this.handleSeekingMouseUp);
        this.loadResource(audio);
    }

    initPlayer = () => {
        this.audio.oncanplaythrough = (e) => {
            const {player} = this.state;
            player.duration = e.currentTarget.duration;
            player.canPlay = true;
            this.setState({player});
        };
        this.audio.ontimeupdate = (e) => {
            const {player, onMouseHold} = this.state;
            player.currentTime = e.currentTarget.currentTime;
            if (player.currentTime === player.duration && !onMouseHold) {
                this.audio.currentTime = 0;
                player.currentTime = 0;
                player.playing = false;
                if(player.repeat === REPEAT_TYPE.REPEAT_ONE){
                    this.setState({player});
                    this.handlePlayPause();
                }
            }
            this.setState({player});
        };

        this.audio.onprogress = (e) => {
            try {
                const {player} = this.state;
                let range = 0;
                let bf = this.audio.buffered;
                let time = this.audio.currentTime;
                while (!(bf.start(range) <= time && time <= bf.end(range))) {
                    range += 1;
                }
                let loadStartPercentage = bf.start(range) / this.audio.duration;
                let loadEndPercentage = bf.end(range) / this.audio.duration;
                player.loadedPercent = (loadEndPercentage - loadStartPercentage) * 100;
                this.setState({player});
            } catch (e) {
                //
            }
        }
    }

    loadResource = (source) => {
        const {player} = this.state;
        player.canPlay = false;
        this.audio.src = source;
        this
            .audio
            .load();
        this.setState({player});
    }

    handlePlayPause = () => {
        const {player} = this.state;
        player.playing = !player.playing;
        if (player.playing) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
        this.setState({player});
    }

    getDurationString = (seconds) => {
        const m = Math.floor((seconds % 3600) / 60)
        const s = Math.floor(seconds % 60);
        return [
            m < 10 ? '0' + m : m,
            s < 10 ? '0' + s : s
        ].join(':');
    }

    getPlayingBar = (currentTime, duration) => {
        let songDuration = document.getElementById('song_duration') || {};
        return Math.ceil((currentTime / duration) * songDuration.clientWidth || 0) + 'px';
    }

    handleSetDuration = (e) => {
        const {player} = this.state;
        if (!player.canPlay) 
            return;
        let sidebarWidth = document
            .getElementById('sidebar')
            .clientWidth;
        let currentPos = e.pageX - e.currentTarget.offsetLeft - sidebarWidth;
        let currentTime = currentPos * (player.duration / e.currentTarget.clientWidth);
        this.audio.currentTime = currentTime;
        player.currentTime = currentTime;
        this.setState({player});
    }

    handleSeekingMouseDown = (e) => {
        const {player} = this.state;
        if (!player.canPlay) 
            return;
        this.setState({onMouseHold: true});
    }

    handleSeekingMouseMove = (e) => {
        const {onMouseHold, player} = this.state;
        if (onMouseHold) {
            let sidebarWidth = document
                .getElementById('sidebar')
                .clientWidth;
            let songDuration = document.getElementById('song_duration');
            let currentPos = e.pageX - songDuration.offsetLeft - sidebarWidth;
            if (currentPos < 0) {
                currentPos = 0;
            }
            if (currentPos > songDuration.clientWidth) {
                currentPos = songDuration.clientWidth;
            }
            let currentTime = currentPos * (player.duration / songDuration.clientWidth);
            this.audio.currentTime = currentTime;
            player.currentTime = currentTime;
            this.setState({player});
        }
    }

    handleVolumeChange = (value) => {
        const {player} = this.state;
        player.volume = value;
        this.audio.volume = value;
        this.setState({player});
    }

    handleMuteVolume = () => {
        const {player} = this.state;
        player.mute = !player.mute;
        if (player.mute) {
            player.muteVolume = player.volume;
            player.volume = 0;
        } else {
            player.volume = player.muteVolume;
            player.muteVolume = 0;
        }
        this.setState({player});
    }

    handleSeekingMouseUp = (e) => {
        this.setState({onMouseHold: false});
    }

    handleRepeat = () => {
        const {player} = this.state;
        if(player.repeat === REPEAT_TYPE.REPEAT_OFF){
            player.repeat = REPEAT_TYPE.REPEAT_ONE;
            this.setState({player});
            return;
        }
        if(player.repeat === REPEAT_TYPE.REPEAT_ONE){
            player.repeat = REPEAT_TYPE.REPEAT_ALL;
            this.setState({player});
            return;
        }
        if(player.repeat === REPEAT_TYPE.REPEAT_ALL){
            player.repeat = REPEAT_TYPE.REPEAT_OFF;
            this.setState({player});
            return;
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleSeekingMouseMove);
        document.removeEventListener('mouseup', this.handleSeekingMouseUp);
    }

    render() {
        const {player} = this.state;
        return (
            <div className={`${styles.container} ${styles.show_player}`}>
                <div className={styles.wrapper}>
                    <div className={styles.song}>
                        <Control
                            player={player}
                            handleVolumeChange={this.handleVolumeChange}
                            handlePlayPause={this.handlePlayPause}
                            handleMuteVolume={this.handleMuteVolume}
                            handleRepeat={this.handleRepeat}    
                        />
                        <div className={styles.song_thumb}>
                            <img src="https://picsum.photos/50/50" alt="Song"/>
                        </div>
                        <div className={styles.song_info}>
                            <div className={styles.song_info_title}>
                                <span className={styles.song_info_title_content}>Em không sai, chúng ta sai</span>
                                <span className={styles.song_info_title_artist}>Huy Le</span>
                            </div>
                            <div
                                id="song_duration"
                                className={styles.song_info_duration}
                                onClick={this.handleSetDuration}>
                                <span className={styles.song_info_duration_time}>{this.getDurationString(player.currentTime)}
                                    / {this.getDurationString(player.duration)}</span>
                                <div
                                    className={styles.song_info_duration_playing}
                                    onMouseDown={this.handleSeekingMouseDown}
                                    style={{
                                        width: this.getPlayingBar(player.currentTime, player.duration)
                                    }}></div>
                                <div
                                    className={styles.song_info_duration_loaded}
                                    style={{
                                        width: player.loadedPercent + '%'
                                    }}></div>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Player);
