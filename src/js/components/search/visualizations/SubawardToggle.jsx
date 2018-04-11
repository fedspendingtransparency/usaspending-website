/**
 * SubawardToggle.jsx
 * Created by Kevin Li 3/29/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    subaward: PropTypes.bool,
    setSearchViewSubaward: PropTypes.func
};

export default class SubawardToggle extends React.Component {
    constructor(props) {
        super(props);

        this.toggledSwitch = this.toggledSwitch.bind(this);
    }
    toggledSwitch() {
        const newValue = !this.props.subaward;
        this.props.setSearchViewSubaward(newValue);
    }

    render() {
        const primeActive = this.props.subaward ? '' : 'subaward-toggle__label_active';
        const subActive = this.props.subaward ? 'subaward-toggle__label_active' : '';
        const trackClass = this.props.subaward ? 'subaward-switch__track_inactive' : '';
        const switchPosition = this.props.subaward ? 'translate(30 0)' : 'translate(9 0)';
        const currentSelection = this.props.subaward ? 'Sub-Awards' : 'Prime Awards';
        return (
            <button
                className="subaward-toggle"
                onClick={this.toggledSwitch}
                aria-pressed={!this.props.subaward}
                aria-label={`Toggle between Prime Awards and Sub-Award. Currently selected: ${currentSelection}`}>
                <div className={`subaward-toggle__label ${primeActive}`}>
                    Prime Awards
                </div>
                <svg
                    className="subaward-toggle__switch subaward-switch"
                    width="45"
                    height="24">
                    <filter id="subaward-toggle__filters">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                        <feOffset dx="0" dy="0" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <g
                        className="subaward-switch__graphic"
                        transform="translate(4 2)">
                        <rect
                            className={`subaward-switch__track ${trackClass}`}
                            width="40"
                            height="20"
                            rx="10"
                            ry="10" />
                        <g
                            className="subaward-switch__switch"
                            transform={switchPosition}>
                            <circle
                                className="subaward-switch__switch-fill"
                                cy="10"
                                r="10"
                                filter="url(#subaward-toggle__filters)" />
                        </g>
                    </g>
                </svg>
                <div className={`subaward-toggle__label ${subActive}`}>
                    Sub-Awards
                </div>
            </button>
        );
    }
}

SubawardToggle.propTypes = propTypes;
