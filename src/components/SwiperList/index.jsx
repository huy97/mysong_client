import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SwiperList.module.scss';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import SwiperItem from './SwiperItem';

export default class SwiperList extends Component {
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array,
        
    }

    static defaultProps = {
        items: [
            {
                title: "Em Không Sai, Chúng Ta Sai",
                artistName: "Huy Huy",
                thumbnail: "https://picsum.photos/200/200"
            },
            {
                title: "Em Không Sai, Chúng Ta Sai",
                artistName: "Huy Huy",
                thumbnail: "https://picsum.photos/200/200"
            },
            {
                title: "Em Không Sai, Chúng Ta Sai",
                artistName: "Huy Huy",
                thumbnail: "https://picsum.photos/200/200"
            },
            {
                title: "Em Không Sai, Chúng Ta Sai",
                artistName: "Huy Huy",
                thumbnail: "https://picsum.photos/200/200"
            },
            {
                title: "Em Không Sai, Chúng Ta Sai",
                artistName: "Huy Huy",
                thumbnail: "https://picsum.photos/200/200"
            },
            {
                title: "Em Không Sai, Chúng Ta Sai",
                artistName: "Huy Huy",
                thumbnail: "https://picsum.photos/200/200"
            },
            {
                title: "Em Không Sai, Chúng Ta Sai",
                artistName: "Huy Huy",
                thumbnail: "https://picsum.photos/200/200"
            },
            {
                title: "Em Không Sai, Chúng Ta Sai",
                artistName: "Huy Huy",
                thumbnail: "https://picsum.photos/200/200"
            },
            {
                title: "Em Không Sai, Chúng Ta Sai",
                artistName: "Huy Huy",
                thumbnail: "https://picsum.photos/200/200"
            },
            {
                title: "Em Không Sai, Chúng Ta Sai",
                artistName: "Huy Huy",
                thumbnail: "https://picsum.photos/200/200"
            },
        ]
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: 0,
            translateWidth: 0
        }
    }

    handleNextPrev = (num) => {
        let { selectedKey, translateWidth } = this.state;
        selectedKey += num;
        if(selectedKey < 0 || (num > 0 && this.swiperContainer.scrollWidth === this.swiperContainer.clientWidth)){
            return;
        }
        translateWidth += num * this.swiperContainer.clientWidth;
        this.setState({selectedKey, translateWidth});
    }

    disabledNextButton = () => {
        const { translateWidth } = this.state;
        return (this.swiperWrapper && this.swiperContainer && (this.swiperWrapper.clientWidth === 0 || this.swiperWrapper.clientWidth - translateWidth <= this.swiperContainer.clientWidth));
    }

    render() {
        const { translateWidth, selectedKey } = this.state;
        const { title, items } = this.props
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                    <div className={styles.right_action}>
                        <button disabled={selectedKey === 0} onClick={(e) => this.handleNextPrev(-1)}>
                            <FiChevronLeft strokeWidth={1.5} size={24}/>
                        </button>
                        <button disabled={this.disabledNextButton()} onClick={(e) => this.handleNextPrev(1)}>
                            <FiChevronRight strokeWidth={1.5} size={24}/>
                        </button>
                    </div>
                </div>
                <div ref={(el) => this.swiperContainer = el} className={styles.swiper}>
                    <div ref={el => this.swiperWrapper = el} className={styles.swiper_wrapper} style={{transform: `translate(-${translateWidth}px)`}}>
                        {items.map((item, key) => (
                            <SwiperItem key={key} item={item}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
