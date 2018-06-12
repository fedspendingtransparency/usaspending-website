/**
 * FloatingGlossaryButton.jsx
 * Created by Kevin Li 4/27/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import Analytics from 'helpers/analytics/Analytics';

import { Glossary } from './icons/Icons';

const propTypes = {
    toggleGlossary: PropTypes.func
};

export default class FloatingGlossaryButton extends React.Component {
    static logGlossaryButtonEvent() {
        Analytics.event({
            category: 'Glossary',
            action: 'Opened Glossary',
            label: 'Floating Glossary Button'
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            hide: true
        };

        this.pageScrolled = throttle(this.pageScrolled.bind(this), 16);
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
        // find the header glossary button
        const header = document.getElementById('header-glossary-button');
        const headerBottom = header.getBoundingClientRect().top + (header.offsetHeight * 0.5);

        if (headerBottom <= 0 && this.state.hide) {
            // show the bottom glossary button
            this.setState({
                hide: false
            });
        }
        else if (headerBottom > 0 && !this.state.hide) {
            // hide the bottom glossary
            this.setState({
                hide: true
            });
        }
    }

    clickedButton() {
        this.props.toggleGlossary();

        // Analytics
        FloatingGlossaryButton.logGlossaryButtonEvent();
    }

    render() {
        let hide = '';
        if (this.state.hide) {
            hide = 'hidden';
        }

        return (
            <div className={`floating-glossary-button-wrapper ${hide}`}>
                <button
                    aria-label="Show Glossary"
                    className="floating-glossary-button"
                    onClick={this.clickedButton}>
                    <div className="button-content">
                        <span className="floating-glossary-icon">
                            <Glossary alt="Glossary" />
                        </span>
                        Glossary
                    </div>
                </button>
            </div>
        );
    }
}

FloatingGlossaryButton.propTypes = propTypes;
