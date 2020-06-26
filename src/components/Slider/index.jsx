import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Slider.module.scss';
import SliderItem from './SliderItem';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default class Slider extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired
    }

    static defaultProps = {
        items: [
            {
                title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                        "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                artistName: "Huy Le",
                link: "https://picsum.photos/1024/350",
                mvLink: "",
                thumbnail: "https://picsum.photos/1024/350",
                thumbnailMedium: "https://picsum.photos/1024/350"
            }, {
                title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                        "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                artistName: "Huy Le",
                link: "https://picsum.photos/1024/350",
                mvLink: "",
                thumbnail: "https://picsum.photos/1024/350",
                thumbnailMedium: "https://picsum.photos/1024/350"
            }, {
                title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                        "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                artistName: "Huy Le",
                link: "https://picsum.photos/1024/350",
                mvLink: "",
                thumbnail: "https://picsum.photos/1024/350",
                thumbnailMedium: "https://picsum.photos/1024/350"
            }, {
                title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                        "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                artistName: "Huy Le",
                link: "https://picsum.photos/1024/350",
                mvLink: "",
                thumbnail: "https://picsum.photos/1024/350",
                thumbnailMedium: "https://picsum.photos/1024/350"
            }
        ]
    }

    state = {
        selectedKey: 0
    }

    handleActiveSlide = (index) => {
        this.setState({selectedKey: index});
    }

    handleNextPrev = (type) => {
        const {items} = this.props;
        let nextKey = this.state.selectedKey + type;
        if(nextKey < 0) nextKey = 0;
        if(nextKey === items.length) nextKey -= 1;
        this.setState({selectedKey: nextKey});
    }

    render() {
        const {items} = this.props;
        const {selectedKey} = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    {
                        items.map(
                            (item, key) => (<SliderItem key={key} selectedKey={selectedKey} item={item}/>)
                        )
                    }
                </div>
                <div className={styles.submenu}>
                    <div className={styles.submenu_prev} onClick={() => this.handleNextPrev(-1)}>
                        <FiChevronLeft size={40}/>
                    </div>
                    {
                        items.map((item, key) => (
                            <div key={key} className={`${styles.submenu_item} ${key === selectedKey ? styles.submenu_active : ''}`}
                                onMouseEnter={(e) => this.handleActiveSlide(key)}
                                onClick={(e) => this.handleActiveSlide(key)}>
                                <img src={item.thumbnail} alt={item.title}/>
                            </div>
                        ))
                    }
                    <div className={styles.submenu_next} onClick={() => this.handleNextPrev(1)}>
                        <FiChevronRight size={40}/>
                    </div>
                </div>
            </div>
        )
    }
}
