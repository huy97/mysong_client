import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.scss';
import { isChild } from 'utils';

export default class Dropdown extends Component {
    static propTypes = {
        trigger: PropTypes.oneOf(['click', 'hover']),
        content: PropTypes.element.isRequired,
        style: PropTypes.object,
        containerStyle: PropTypes.object,
        placement: PropTypes.oneOf(["top", "right", "bottom", "left", "topleft", "topright", "bottomleft", "bottomright"])
    }

    static defaultProps = {
        trigger: "click",
        placement: "bottom",
        containerStyle: {},
        style: {}
    }

    state = {
        visible: false
    }

    componentDidMount() {
        document.addEventListener('click', this.handleVisibleDropdown);
    }
    

    getPlacement = () => {
        const {placement} = this.props;
        switch(placement){
            case "top":
                return styles.menu_top;
            case "bottom":
                return styles.menu_bottom;
            case "bottomleft":
                return styles.menu_bottom_left;
            case "bottomright":
                return styles.menu_bottom_right;
            case "topleft":
                return styles.menu_top_left;
            case "topright":
                return styles.menu_top_right;
            case "left":
                return styles.menu_left;
            case "right":
                return styles.menu_right;
            default:
                return "";
        }
    }
    handleTrigger = (e) => {
        this.setState({visible: !this.state.visible});
    }
    
    handleVisibleDropdown = (e) => {
        if(this.dropdownContainer){
            if(!isChild(this.dropdownContainer, e.target) && this.state.visible){
                this.setState({visible: false});
            }
        }
    }



    componentWillUnmount() {
        document.removeEventListener('click', this.handleVisibleDropdown);
    }
    

    render() {
        const {visible} = this.state;
        const {children, content, style, containerStyle} = this.props;
        return (
            <div ref={el => this.dropdownContainer = el} className={styles.container} style={containerStyle}>
                <div className={styles.trigger} onClick={this.handleTrigger}>
                    {children}
                </div>
                <div className={`${styles.menu} ${this.getPlacement()} ${visible ? styles.menu_active : null}`} style={style}>
                    {content}
                </div>
            </div>
        )
    }
}
