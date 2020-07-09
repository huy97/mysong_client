import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Slider.module.scss';
import SliderItem from './SliderItem';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export default class Slider extends Component {

    constructor(props){
        super(props);
        this.timing = null;
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        timing: PropTypes.number
    }

    static defaultProps = {
        items: [
            {
                title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                        "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                artistName: "Huy Le",
                link: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc",
                mvLink: "",
                thumbnail: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc",
                thumbnailMedium: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc"
            }, {
                title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                        "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                artistName: "Huy Le",
                link: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc",
                mvLink: "",
                thumbnail: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc",
                thumbnailMedium: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc"
            }, {
                title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                        "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                artistName: "Huy Le",
                link: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc",
                mvLink: "",
                thumbnail: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc",
                thumbnailMedium: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc"
            }, {
                title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                        "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                artistName: "Huy Le",
                link: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc",
                mvLink: "",
                thumbnail: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc",
                thumbnailMedium: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwBZaV8B2f6oVbycc"
            }
        ],
        timing: 5000
    }

    state = {
        selectedKey: 0
    }

    componentDidMount() {
        this.handleAutoTiming();
    }
    
    handleAutoTiming = () => {
        clearInterval(this.timing);
        this.timing = setInterval(() => {
            this.handleNextPrev(1);
        }, this.props.timing);
    }

    handleActiveSlide = (index) => {
        this.handleAutoTiming();
        this.setState({selectedKey: index});
    }

    handleNextPrev = (type) => {
        const {items} = this.props;
        let nextKey = this.state.selectedKey + type;
        if(nextKey < 0) nextKey = items.length - 1;
        if(nextKey === items.length) nextKey = 0;
        this.handleActiveSlide(nextKey);
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
