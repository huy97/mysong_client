import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SwiperList.module.scss';
import { FiPlay } from 'react-icons/fi';

export class SwiperItem extends Component {
    static propTypes = {
        item: PropTypes.object,
    }

    render() {
        const { item, style, innerRef } = this.props
        return (
            <div ref={innerRef} className={styles.swiper_wrapper_item} style={style}>
                <div className={styles.swiper_wrapper_item_thumbnail}>
                    <img src={item.thumbnail} alt={item.title}/>
                </div>
                <div className={styles.swiper_wrapper_item_over}></div>
                <div className={styles.swiper_wrapper_item_title}>
                    <span style={{color: "#fff"}}>
                        <FiPlay size={48}/>
                    </span>
                    <h3>{item.title}</h3>
                    <span>{item.artistName}</span>
                </div>
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <SwiperItem innerRef={ref} {...props}/>);
