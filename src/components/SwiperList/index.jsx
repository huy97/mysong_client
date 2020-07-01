import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SwiperList.module.scss';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import SwiperItem from './SwiperItem';

export default class SwiperList extends Component {
    static propTypes = {
        title: PropTypes.string,
        items: PropTypes.array
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
            totalPage: 0,
            nextWidth: 0
        }
    }

    componentDidMount() {
        this.getTotalPage();
    }
    
    getTotalPage = () => {
        const { items } = this.props;
        let totalPage = Math.floor(items.length / 5);
        this.setState({totalPage});
    }

    handleNextPrev = (num) => {
        let { selectedKey, totalPage } = this.state;
        selectedKey += num;
        if(selectedKey < 0 || selectedKey > totalPage){
            return;
        }
        let nextWidth = selectedKey * this.swiperWrapper.clientWidth + 19;
        this.setState({selectedKey, nextWidth});
    }

    render() {
        const { nextWidth } = this.state;
        const { title, items } = this.props
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <h1>{title}</h1>
                    </div>
                    <div className={styles.right_action}>
                        <button onClick={(e) => this.handleNextPrev(-1)}>
                            <FiChevronLeft strokeWidth={1.5} size={24}/>
                        </button>
                        <button onClick={(e) => this.handleNextPrev(1)}>
                            <FiChevronRight strokeWidth={1.5} size={24}/>
                        </button>
                    </div>
                </div>
                <div className={styles.swiper}>
                    <div ref={(el) => this.swiperWrapper = el} className={styles.swiper_wrapper}>
                        {items.map((item, key) => (
                            <SwiperItem ref={el => this.swiperItem = el} key={key} item={item} style={{transform: `translate(-${nextWidth}px)`}}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
