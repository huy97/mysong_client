import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Slider.module.scss';
import {FiPlayCircle} from 'react-icons/fi';
import noImage from 'assets/no_image.png';

export default class SliderItem extends Component {
    static propTypes = {
        item: PropTypes.object
    }

    componentDidMount = () => {
        const {item} = this.props;
        let image = new Image(1024, 350);
        image.src = item.thumbnailMedium;
        image.onload = () => {
            this.itemImage.src = image.src;
        }
    }

    render() {
        const {item, selectedKey} = this.props;
        return (
            <div
                className={styles.item} style={{transform: `translateX(-${selectedKey*100}%)`}}>
                <div className={styles.item_title}>
                    <h2>{item.title}</h2>
                    <h4>{item.artistName}</h4>
                </div>
                <div className={styles.item_over}></div>
                <div className={styles.item_icon}>
                    <FiPlayCircle size={64} strokeWidth={1}/>
                </div>
                <img
                    ref={el => this.itemImage = el}
                    className={styles.item_image}
                    src={noImage}
                    alt={item.title}/>
            </div>
        )
    }
}
