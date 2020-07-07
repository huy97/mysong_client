import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './List.module.scss';

export default class ListItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        grid: PropTypes.number,
        render: PropTypes.func
    }

    getStyle = () => {
        const { grid } = this.props;
        let style = {};
        if(grid){
            style.width = (100/grid).toFixed(2) + '%';
        }
        return  style;
    }

    render() {
        const { render, item } = this.props;
        return (
            <div className={styles.list_item} style={this.getStyle()}>
                {render(item)}
            </div>
        )
    }
}

