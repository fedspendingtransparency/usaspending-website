/**
 * ImageCarousel.jsx
 * Created by Kevin Li 1/22/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    images: PropTypes.array.isRequired
};

export default class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1
        };

        // these are not state because we don't need to trigger a new render
        this._isDragging = false;
        this._imageWidth = 0;

        this.measureList = this.measureList.bind(this);

        this.touchedCarousel = this.touchedCarousel.bind(this);
        this.untouchedCarousel = this.untouchedCarousel.bind(this);
        this.draggedCarousel = this.draggedCarousel.bind(this);

        this.clickedDot = this.clickedDot.bind(this);
        this.previousItem = this.previousItem.bind(this);
        this.nextItem = this.nextItem.bind(this);
    }

    componentDidMount() {
        this.measureList();
        window.addEventListener('resize', this.measureList);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measureList);
    }

    measureList() {
        if (this.carouselContainer) {
            this._imageWidth = this.carouselContainer.clientWidth;
        }
    }


    touchedCarousel() {

    }

    untouchedCarousel() {

    }

    draggedCarousel() {

    }

    previousItem() {
        if (this.state.page > 1) {
            this.goToItem(this.state.page - 1);
        }
        else {
            this.goToItem(this.props.images.length);
        }
    }

    nextItem() {
        if (this.state.page + 1 <= this.props.images.length) {
            this.goToItem(this.state.page + 1);
        }
        else {
            this.goToItem(1);
        }
    }

    goToItem(i) {
        this.setState({
            page: i
        }, () => {
            console.log(this._imageWidth);
            const offset = (this.state.page - 1) * this._imageWidth * -1;
            if (this.carouselList) {
                this.carouselList.style.transform = `translate(${offset}px, 0px)`;
            }
        });
    }

    clickedDot(e) {
        const page = e.target.value;
        this.goToItem(page);
    }


    render() {
        const dots = [];
        const images = this.props.images.map((image, index) => {
            let activeClass = '';
            if (index + 1 === this.state.page) {
                activeClass = 'active';
            }

            const dot = (
                <li key={image.key || image.src}>
                    <button
                        className={`carousel-dot ${activeClass}`}
                        value={index + 1}
                        onClick={this.clickedDot}
                        aria-label={`Skip to carousel item ${index + 1}`}
                        aria-checked={index + 1 === this.state.page}
                        role="menuitemradio">
                        <div className="dot" />
                    </button>
                </li>
            );

            dots.push(dot);

            return (
                <li key={image.key || image.src}>
                    <img
                        src={image.src}
                        srcSet={image.srcSet}
                        alt={image.alt} />
                </li>
            );
        });

        return (
            <div className="homepage-image-carousel">
                <div className="carousel-top">
                    <button
                        aria-label="Previous carousel item"
                        className="carousel-arrow left"
                        onClick={this.previousItem}>
                        <img
                            src="img/carousel-arrow-right.png"
                            srcSet="img/carousel-arrow-right.png 1x, img/carousel-arrow-right@2x.png 2x"
                            alt="Previous carousel item" />
                    </button>
                    <div
                        className="carousel-container"
                        ref={(div) => {
                            this.carouselContainer = div;
                        }}>
                        <ul
                            className="carousel-images"
                            ref={(ul) => {
                                this.carouselList = ul;
                            }}>
                            {images}
                        </ul>
                    </div>
                    <button
                        aria-label="Next carousel item"
                        className="carousel-arrow right"
                        onClick={this.nextItem}>
                        <img
                            src="img/carousel-arrow-right.png"
                            srcSet="img/carousel-arrow-right.png 1x, img/carousel-arrow-right@2x.png 2x"
                            alt="Next carousel item" />
                    </button>
                </div>
                <div className="carousel-bottom">
                    <ul
                        className="carousel-dots"
                        role="menu"
                        aria-label="Pagination controls for carousel items">
                        {dots}
                    </ul>
                </div>
            </div>
        );
    }
}

ImageCarousel.propTypes = propTypes;
