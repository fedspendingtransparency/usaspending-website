/**
 * FloatingGuideButton.jsx
 * Created by Kevin Li 4/27/17
 */

import React from 'react';

import { Guide } from './icons/Icons';

const propTypes = {
    toggleGuide: React.PropTypes.func
};

export default class FloatingGuideButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hide: true
        };

        this.pageScrolled = this.pageScrolled.bind(this);
        this.clickedButton = this.clickedButton.bind(this);
    }

    componentDidMount() {
        // listen for page scrolls
        window.addEventListener('scroll', this.pageScrolled);
        this.pageScrolled();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.pageScrolled);
    }

    pageScrolled() {
        // find the header guide button
        const header = document.getElementById('header-guide-button');
        const headerBottom = header.getBoundingClientRect().top + (header.offsetHeight * 0.5);

        if (headerBottom <= 0 && this.state.hide) {
            // show the bottom guide button
            this.setState({
                hide: false
            });
        }
        else if (headerBottom > 0 && !this.state.hide) {
            // hide the bottom guide
            this.setState({
                hide: true
            });
        }
    }

    clickedButton() {
        this.props.toggleGuide();
    }

    render() {
        let hide = '';
        if (this.state.hide) {
            hide = 'hidden';
        }

        return (
            <div className={`floating-guide-button-wrapper ${hide}`}>
                <button
                    aria-label="Show Guide"
                    className="floating-guide-button"
                    onClick={this.clickedButton}>
                    <div className="button-content">
                        <span className="floating-guide-icon">
                            <Guide alt="Guide" />
                        </span>
                        Guide
                    </div>
                </button>
            </div>
        );
    }
}

FloatingGuideButton.propTypes = propTypes;
