/**
 * ImageCarousel.jsx
 * Created by Kevin Li 1/22/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AngleLeft, AngleRight } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    images: PropTypes.array.isRequired
};

export default class ImageCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            isDragging: false
        };

        // these are not state because we don't need to trigger a new render
        this._lastDragX = null;
        this._currentX = 0;

        this.touchedCarousel = this.touchedCarousel.bind(this);
        this.untouchedCarousel = this.untouchedCarousel.bind(this);
        this.touchDraggedCarousel = this.touchDraggedCarousel.bind(this);

        this.startedMouseDrag = this.startedMouseDrag.bind(this);
        this.stoppedMouseDrag = this.stoppedMouseDrag.bind(this);
        this.performedMouseDrag = this.performedMouseDrag.bind(this);


        this.clickedDot = this.clickedDot.bind(this);
        this.previousItem = this.previousItem.bind(this);
        this.nextItem = this.nextItem.bind(this);

        this.resizeCarousel = this.resizeCarousel.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeCarousel);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeCarousel);
    }

    touchedCarousel() {
        this.setState({
            isDragging: true
        });
    }

    untouchedCarousel() {
        this.commonDragCompletion();
    }

    touchDraggedCarousel(e) {
        if (!this.state.isDragging || !e.touches || !e.touches.length || !this.carouselList) {
            return;
        }
        // arbitrarily just go with the first touch
        const firstTouch = e.touches[0];
        if (this._lastDragX === null) {
            // this is the first drag event
            this._lastDragX = firstTouch.pageX;
        }
        else {
            this.commonDragLogic(firstTouch.pageX);
        }
    }

    startedMouseDrag(e) {
        // stop the browser from trying to drag the image for saving
        // or whatever native drag behavior
        e.preventDefault();
        this.setState({
            isDragging: true
        });
    }

    stoppedMouseDrag() {
        if (!this.state.isDragging) {
            return;
        }

        this.commonDragCompletion();
    }

    performedMouseDrag(e) {
        if (!this.state.isDragging) {
            return;
        }

        if (this._lastDragX === null) {
            // this is the first drag event
            this._lastDragX = e.pageX;
        }
        else {
            this.commonDragLogic(e.pageX);
        }
    }

    commonDragLogic(xPos) {
        const change = xPos - this._lastDragX;
        this._lastDragX = xPos;

        this._currentX = this._currentX + change;
        this.carouselList.style.transform = `translate(${this._currentX}px, 0px)`;
    }

    commonDragCompletion() {
        this._lastDragX = null;
        this.setState({
            isDragging: false
        }, () => {
            // calculate the closest page
            const page = this.determineClosestPage();
            this.goToItem(page);
        });
    }

    resizeCarousel() {
        this.goToItem(this.state.page);
    }

    determineClosestPage() {
        const imageWidth = this.carouselContainer.offsetWidth;
        const page = Math.round((this._currentX * -1) / imageWidth) + 1;
        if (page > this.props.images.length) {
            return this.props.images.length;
        }
        else if (page < 1) {
            return 1;
        }
        return page;
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
            if (this.carouselList && this.carouselContainer) {
                const imageWidth = this.carouselContainer.offsetWidth;
                const offset = (this.state.page - 1) * imageWidth * -1;
                this._currentX = offset;
                this.carouselList.style.transform = `translate(${offset}px, 0px)`;
            }
        });
    }

    clickedDot(e) {
        const page = parseInt(e.target.value, 10);
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

        let activeDrag = '';
        if (this.state.isDragging) {
            activeDrag = 'dragging';
        }

        return (
            <div className="homepage-image-carousel">
                <div className="carousel-top">
                    <button
                        aria-label="Previous carousel item"
                        className="carousel-arrow left"
                        onClick={this.previousItem}>
                        <AngleLeft alt="Previous carousel item" />
                    </button>
                    <div
                        className="carousel-container"
                        onTouchStart={this.touchedCarousel}
                        onTouchMove={this.touchDraggedCarousel}
                        onTouchEnd={this.untouchedCarousel}
                        onTouchCancel={this.untouchedCarousel}
                        onMouseDown={this.startedMouseDrag}
                        onMouseUp={this.stoppedMouseDrag}
                        onMouseLeave={this.stoppedMouseDrag}
                        onMouseMove={this.performedMouseDrag}
                        ref={(div) => {
                            this.carouselContainer = div;
                        }}>
                        <ul
                            className={`carousel-images ${activeDrag}`}
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
                        <AngleRight alt="Next carousel item" />
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
