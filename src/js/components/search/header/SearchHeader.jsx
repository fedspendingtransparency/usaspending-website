/**
  * SearchHeader.jsx
  * Created by Kevin Li 11/10/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import DownloadButton from './DownloadButton';

const propTypes = {
    showDownloadModal: PropTypes.func,
    downloadAvailable: PropTypes.bool
};

export default class SearchHeader extends React.Component {
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
            stickyClass = 'sticky';
        }

        return (
            <div
                className="search-header-wrapper"
                ref={(div) => {
                    this.wrapper = div;
                }}>
                <div
                    className={`search-header-container ${stickyClass}`}
                    ref={(div) => {
                        this.content = div;
                    }}>
                    <div className="search-header">
                        <div className="search-title">
                            <h1>Award Search</h1>
                        </div>
                        <div className="search-options">
                            <DownloadButton
                                downloadAvailable={this.props.downloadAvailable}
                                onClick={this.props.showDownloadModal} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SearchHeader.propTypes = propTypes;
