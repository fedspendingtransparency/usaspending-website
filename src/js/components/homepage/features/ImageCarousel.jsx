/**
 * ImageCarousel.jsx
 * Created by Kevin Li 1/22/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        this._instanceId = uniqueId();

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
    // determine how much we have moved the cursor
        const change = xPos - this._lastDragX;
        this._lastDragX = xPos;

        // change the carousel translation by the same amount
        this._currentX += change;
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
        // don't allow page to be 0 based (min page is 1)
        // also we need to use the negative of the X position because the translation that occurred
        // was negative, but our pages are positive
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
                activeClass = 'feature-carousel-pager__dot-button_active';
            }
            // create the bottom pagination dots while we're iterating through the image array
            const dot = (
                <li
                    className="feature-carousel-pager__list-item"
                    key={image.key || image.src}>
                    <button
                        className={`feature-carousel-pager__dot-button ${activeClass}`}
                        value={index + 1}
                        onClick={this.clickedDot}
                        aria-label={`Skip to carousel item ${index + 1}`}
                        aria-checked={index + 1 === this.state.page}
                        role="menuitemradio">
                        <div className="feature-carousel-pager__dot-decorator" />
                    </button>
                </li>
            );

            dots.push(dot);

            // now also create the image items
            return (
                <li
                    className="feature-carousel-image__list-item"
                    key={image.key || image.src}
                    aria-hidden={this.state.page !== index + 1}
                    tabIndex={-1}>
                    <picture className="feature-carousel-image__image">
                        <source srcSet={image.srcSet} type="image/webp" />
                        <source srcSet={image.src} type="image/png" />
                        <img src={image.src} alt={image.alt} />
                    </picture>
                </li>
            );
        });

        let activeDrag = '';
        if (this.state.isDragging) {
            activeDrag = 'feature-carousel-image__list_dragging';
        }

        let hiddenLeft = '';
        if (this.state.page === 1) {
            hiddenLeft = 'feature-carousel-content__arrow_hidden';
        }

        let hiddenRight = '';
        if (this.state.page === this.props.images.length) {
            hiddenRight = 'feature-carousel-content__arrow_hidden';
        }

        let screenreaderDescription = `${this.props.images.length} item`;
        if (this.props.images.length !== 1) {
            screenreaderDescription += 's';
        }

        return (
            <div
                className="feature-carousel"
                aria-describedby={`${this._instanceId}-instructions`}>
                <div
                    id={`${this._instanceId}-instructions`}
                    className="feature-carousel__instructions"
                    aria-live="polite">
                    An image carousel containing {screenreaderDescription}, with item {this.state.page} shown.
                </div>
                <div className="feature-carousel-content">
                    <button
                        aria-label="Previous carousel item"
                        className={`feature-carousel-content__arrow ${hiddenLeft}`}
                        aria-hidden={this.state.page === 1}
                        disabled={this.state.page === 1}
                        onClick={this.previousItem}>
                        <FontAwesomeIcon size="lg" icon="chevron-left" />
                    </button>
                    <div
                        className="feature-carousel-image"
                        onTouchStart={this.touchedCarousel}
                        onTouchMove={this.touchDraggedCarousel}
                        onTouchEnd={this.untouchedCarousel}
                        onTouchCancel={this.untouchedCarousel}
                        onMouseDown={this.startedMouseDrag}
                        onMouseUp={this.stoppedMouseDrag}
                        onMouseLeave={this.stoppedMouseDrag}
                        onMouseMove={this.performedMouseDrag}
                        role="presentation"
                        ref={(div) => {
                            this.carouselContainer = div;
                        }}>
                        <ul
                            className={`feature-carousel-image__list ${activeDrag}`}
                            aria-live="polite"
                            ref={(ul) => {
                                this.carouselList = ul;
                            }}>
                            {images}
                        </ul>
                    </div>
                    <button
                        aria-label="Next carousel item"
                        className={`feature-carousel-content__arrow ${hiddenRight}`}
                        aria-hidden={this.state.page === this.props.images.length}
                        disabled={this.state.page === this.props.images.length}
                        onClick={this.nextItem}>
                        <FontAwesomeIcon size="lg" icon="chevron-right" />
                    </button>
                </div>
                <div className="feature-carousel-pager">
                    <ul
                        className="feature-carousel-pager__list"
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
