/**
 * StickyHeader.jsx
 * Created by Mike Bray 02/02/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    showDownloadModal: PropTypes.func,
    downloadAvailable: PropTypes.bool,
    children: PropTypes.node
};

export default class StickyHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            floatY: 0,
            isSticky: false
        };

        this.handleScroll = this.handleScroll.bind(this);
        this.measureScreen = this.measureScreen.bind(this);
    }

    componentDidMount() {
        this.measureScreen();
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.measureScreen);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.measureScreen);
    }

    measureScreen() {
        // measure the default position of the header bar
        const wrapperY = this.wrapper.offsetTop;

        this.setState({
            floatY: wrapperY
        }, () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY >= this.state.floatY && !this.state.isSticky) {
            this.setState({
                isSticky: true
            });
        }
        else if (scrollY < this.state.floatY && this.state.isSticky) {
            this.setState({
                isSticky: false
            });
        }
    }

    render() {
        let stickyClass = '';
        if (this.state.isSticky) {
            stickyClass = 'sticky-header__container_sticky';
        }

        return (
            <div
                className="sticky-header__wrapper"
                ref={(div) => {
                    this.wrapper = div;
                }}>
                <div
                    className={`sticky-header__container ${stickyClass}`}
                    ref={(div) => {
                        this.content = div;
                    }}>
                    <div
                        className="sticky-header"
                        aria-labelledby="main-focus">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

StickyHeader.propTypes = propTypes;
