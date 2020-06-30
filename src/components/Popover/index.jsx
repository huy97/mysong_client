import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Popover.module.scss';
import { isChild } from 'utils';

export default class Popover extends Component {
    static propTypes = {
        content: PropTypes.element.isRequired,
        style: PropTypes.object,
        containerStyle: PropTypes.object,
    }

    static defaultProps = {
        containerStyle: {},
        style: {}
    }

    state = {
        visible: false,
        position: {
            top: 0,
            left: 0
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleVisibleMenu);

        this.popoverContainer.oncontextmenu = (e) => {
            this.handleCustomMenu(e);
            return false;
        }
    }
    
    handleCustomMenu = (e) => {
        let wHeight = window.innerHeight;
        let wWidth = window.innerWidth;
        let position = {};
        if(wHeight - e.clientY > this.poperContentMenu.clientHeight){
            position.top = e.offsetY;
        }else{
            if(e.clientY > this.poperContentMenu.clientHeight){
                position.bottom = this.popoverContainer.clientHeight - e.offsetY;
            }else{
                position.top = e.offsetY;
            }
        }
        if(wWidth - e.clientX > this.poperContentMenu.clientWidth){
            position.left = e.offsetX;
        }else{
            if(e.clientX > this.poperContentMenu.clientWidth){
                position.right = this.popoverContainer.clientWidth - e.offsetX;
            }else{
                position.left = e.offsetX;
            }
        }
        this.setState({visible: true, position});
    }

    handleVisibleMenu = (e) => {
        if(this.state.visible && !isChild(this.popoverMain, e.target)){
            this.setState({visible: false});
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleVisibleMenu);
    }
    

    render() {
        const {children, content, containerStyle} = this.props;
        const {visible, style, position} = this.state;
        return (
            <div className={styles.container} ref={el => this.popoverMain = el} style={containerStyle}>
                <div ref={(el) => this.popoverContainer = el}>
                    {children}
                </div>
                <div ref={(el) => this.poperContentMenu = el} className={`${styles.content} ${visible ? styles.content_active : null}`} style={{...style, ...position}}>
                    {content}
                </div>
            </div>
        )
    }
}
