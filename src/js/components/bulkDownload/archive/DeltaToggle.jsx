/**
 * DeltaToggle.jsx
 * Created by David 5/9/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    delta: PropTypes.bool,
    setSearchViewSubaward: PropTypes.func
};

export default class DeltaToggle extends React.Component {
    constructor(props) {
        super(props);

        this.toggledSwitch = this.toggledSwitch.bind(this);
    }
    toggledSwitch() {
        const newValue = !this.props.delta;
        this.props.setSearchViewSubaward(newValue);
    }

    render() {
        const fullActive = this.props.delta ? '' : 'delta-toggle__label_active';
        const deltaActive = this.props.delta ? 'delta-toggle__label_active' : '';
        const switchPosition = this.props.delta ? 'translate(30 0)' : 'translate(9 0)';
        const currentSelection = this.props.delta ? 'Delta Files' : 'Full Files';
        return (
            <button
                className="delta-toggle"
                onClick={this.toggledSwitch}
                aria-pressed={!this.props.delta}
                aria-label={`Toggle between Full Files and Delta Files. Currently selected: ${currentSelection}`}>
                <div className={`delta-toggle__label ${fullActive}`}>
                    Full File
                </div>
                <svg
                    className="delta-toggle__switch delta-switch"
                    width="45"
                    height="24">
                    <filter id="delta-toggle__filters">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                        <feOffset dx="0" dy="0" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <g
                        className="delta-switch__graphic"
                        transform="translate(4 2)">
                        <rect
                            className="delta-switch__track"
                            width="40"
                            height="20"
                            rx="10"
                            ry="10" />
                        <g
                            className="delta-switch__switch"
                            transform={switchPosition}>
                            <circle
                                className="delta-switch__switch-fill"
                                cy="10"
                                r="10"
                                filter="url(#delta-toggle__filters)" />
                        </g>
                    </g>
                </svg>
                <div className={`delta-toggle__label ${deltaActive}`}>
                    Delta Files
                </div>
            </button>
        );
    }
}

DeltaToggle.propTypes = propTypes;
