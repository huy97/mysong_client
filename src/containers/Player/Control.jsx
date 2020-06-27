import React, { Component } from 'react';
import styles from './Player.module.scss';
import {
    FiPlay,
    FiSkipBack,
    FiSkipForward,
    FiPause,
    FiHeart,
    FiVolumeX,
    FiVolume2,
    FiVolume1,
    FiVolume
} from 'react-icons/fi';
import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/index.css';
import { REPEAT_TYPE } from 'constants/global';
import { RiRepeatOneLine, RiShuffleLine, RiRepeat2Line } from 'react-icons/ri';

export default class Control extends Component {
    RenderVolume = () => {
        const {player, handleMuteVolume} = this.props;
        if(player.mute){
            return <FiVolumeX size={20} strokeWidth={1.5} onClick={handleMuteVolume}/>;
        }
        if(player.volume > 0.5)
            return <FiVolume2 size={20} strokeWidth={1.5} onClick={handleMuteVolume}/>;
        if(player.volume > 0 && player.volume <= 0.5)
            return <FiVolume1 size={20} strokeWidth={1.5} onClick={handleMuteVolume}/>
        return (<FiVolume size={20} strokeWidth={1.5} onClick={handleMuteVolume}/>);
    }

    RenderRepeat = () => {
        const {player, handleRepeat} = this.props;
        if(player.repeat === REPEAT_TYPE.REPEAT_ALL){
            return (
                <div className={styles.control_button_repeat_all} onClick={handleRepeat}>
                    <RiRepeat2Line size={20} stroke={1}/>
                    <span>ALL</span>
                </div>
            );
        }
        if(player.repeat === REPEAT_TYPE.REPEAT_ONE){
            return <RiRepeatOneLine size={20} stroke={1} onClick={handleRepeat}/>;
        }
        return <RiRepeat2Line size={20} stroke={1} onClick={handleRepeat}/>;
    }
    
    render() {
        const {player, handlePlayPause, handleVolumeChange} = this.props;
        return (
            <div className={styles.control}>
                <button className={styles.control_button}>
                    <FiSkipBack size={20} strokeWidth={1.5}/>
                </button>
                <button className={styles.control_button} onClick={handlePlayPause}>
                    {
                        player.playing
                            ? <FiPause size={36} strokeWidth={1.5}/>
                            : <FiPlay size={36} strokeWidth={1.5}/>
                    }
                </button>
                <button className={styles.control_button}>
                    <FiSkipForward size={20} strokeWidth={1.5}/>
                </button>
                <button className={styles.control_button}>
                    <RiShuffleLine size={20} stroke={1}/>
                </button>
                <button className={styles.control_button}>
                    <this.RenderRepeat/>
                </button>
                <button className={styles.control_button}>
                    <FiHeart size={20} strokeWidth={1.5}/>
                </button>
                <button className={styles.control_button}>
                    <this.RenderVolume/>
                    <div className={styles.control_button_volume}>
                        <Slider vertical value={player.volume} min={0} max={1} step={0.01} onChange={handleVolumeChange} className={styles.control_button_volume_slider}/>
                    </div>
                </button>
            </div>
        )
    }
}
