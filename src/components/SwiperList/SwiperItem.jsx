import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SwiperList.module.scss';
import { FiPlay } from 'react-icons/fi';
import noImage from 'assets/190x190.png';

export class SwiperItem extends Component {
    static propTypes = {
        item: PropTypes.object,
    }

    componentDidMount() {
        const { item } = this.props;
        if(item.thumbnail){
            let image = new Image();
            image.onload = () => {
                if(this.image){
                    this.image.src = image.src;
                }
            }
            image.src = item.thumbnail;
        }
    }
    

    render() {
        const { item, style, innerRef } = this.props
        return (
            <div ref={innerRef} className={styles.swiper_wrapper_item} style={style}>
                <div className={styles.swiper_wrapper_item_thumbnail}>
                    <img ref={el => this.image = el} src={noImage} alt={item.title}/>
                </div>
                <div className={styles.swiper_wrapper_item_over}></div>
                <div className={styles.swiper_wrapper_item_title}>
                    <span style={{color: "#fff"}}>
                        <FiPlay strokeWidth={1.5} size={48}/>
                    </span>
                    <h3>{item.title}</h3>
                    <span>{item.artistName}</span>
                </div>
            </div>
        )
    }
}

export default React.forwardRef((props, ref) => <SwiperItem innerRef={ref} {...props}/>);
