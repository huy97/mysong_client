import React, { Component, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import styles from './List.module.scss';

export default class List extends Component {
    static propTypes = {
        items: PropTypes.array,
        grid: PropTypes.number
    }

    static defaultProps = {
        items: [
            {
                title: "Em không sai, chúng ta sai",
                thumbnail: "https://picsum.photos/50/50"
            },
            {
                title: "Em không sai, chúng ta sai",
                thumbnail: "https://picsum.photos/50/50"
            },
            {
                title: "Em không sai, chúng ta sai",
                thumbnail: "https://picsum.photos/50/50"
            },
            {
                title: "Em không sai, chúng ta sai",
                thumbnail: "https://picsum.photos/50/50"
            },
            {
                title: "Em không sai, chúng ta sai",
                thumbnail: "https://picsum.photos/50/50"
            },
            {
                title: "Em không sai, chúng ta sai",
                thumbnail: "https://picsum.photos/50/50"
            },
        ]
    }

    render() {
        const {children, items, grid} = this.props;
        return (
            <div className={styles.container}>
                {items.map((item, key) => isValidElement(children) ? cloneElement(children, {key, item, grid}) : children)}
            </div>
        )
    }
}
