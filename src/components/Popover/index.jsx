import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Popover.module.scss';
import { isChild } from 'utils';
// import { isChild } from 'utils';

export default class Popover extends Component {
    static propTypes = {
        content: PropTypes.element.isRequired,
        style: PropTypes.object,
        mouse: PropTypes.oneOf(['left', 'right']),
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        containerStyle: PropTypes.object,
    }

    static defaultProps = {
        containerStyle: {},
        style: {},
        mouse: "right",
        onShow: () => {},
        onHide: () => {}
    }

    state = {
        visible: false,
        position: {
            top: 0,
            left: 0
        }
    }

    componentDidMount() {
        const { mouse } = this.props;
        document.addEventListener('click', this.handleVisibleMenu);
        document.addEventListener('contextmenu', this.handleVisibleMenu);
        if(mouse === "left"){
            this.popoverContainer.addEventListener('click', this.handleCustomMenu);
        }else{
            this.popoverContainer.oncontextmenu = (e) => {
                let event = new Event('click');
                document.dispatchEvent(event);
                this.handleCustomMenu(e);
                return false;
            }
        }
    }
    
    handleCustomMenu = (e) => {
        let wHeight = window.innerHeight;
        let wWidth = window.innerWidth;
        let position = {};
        if(wHeight - e.clientY <= this.poperContentMenu.clientHeight){
            position.bottom = this.popoverContainer.clientHeight - e.layerY;
        }else{
            position.top = e.layerY;
        }
        if(wWidth - e.clientX <= this.poperContentMenu.clientWidth){
            position.right = this.popoverContainer.clientWidth - e.layerX;
        }else{
            position.left = e.layerX;
        }
        this.props.onShow(e);
        this.setState({visible: true, position});
    }

    handleVisibleMenu = (e) => {
        if(this.state.visible){
            if(!isChild(this.popoverContainer, e.target) && !isChild(this.poperContentMenu, e.target)){
                this.props.onHide(e);
                this.setState({visible: false});
            }
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleVisibleMenu);
        document.removeEventListener('contextmenu', this.handleVisibleMenu);
        this.popoverContainer.removeEventListener('click', this.handleCustomMenu);
    }
    

    render() {
        const {children, content, style, containerStyle} = this.props;
        const {visible, position} = this.state;
        return (
            <div className={styles.container} style={containerStyle}>
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
