import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './List.module.scss';

export default class ListItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        render: PropTypes.func
    }

    render() {
        const { render, item } = this.props;
        return (
            <div className={styles.list_item}>
                {render(item)}
            </div>
        )
    }
}

