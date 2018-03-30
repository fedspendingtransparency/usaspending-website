/**
 * SubawardToggle.jsx
 * Created by Kevin Li 3/29/18
 */

import React from 'react';

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
        const switchPosition = this.props.subaward ? 'translate(30 2)' : 'translate(2 2)';
        return (
            <button
                className="subaward-toggle"
                onClick={this.toggledSwitch}>
                <div className={`subaward-toggle__label ${primeActive}`}>
                    Prime Awards
                </div>
                <svg
                    className="subaward-toggle__switch subaward-switch"
                    width="60"
                    height="20">
                    <rect
                        className={`subaward-switch__track ${trackClass}`}
                        width="60"
                        height="20" />
                    <g
                        className="subaward-switch__switch"
                        transform={switchPosition}>
                        <rect
                            className="subaward-switch__switch-fill"
                            width="28"
                            height="16" />
                        <rect
                            className="subaward-switch__switch-grip"
                            width="2"
                            height="8"
                            x="9"
                            y="4" />
                        <rect
                            className="subaward-switch__switch-grip"
                            width="2"
                            height="8"
                            x="13"
                            y="4" />
                        <rect
                            className="subaward-switch__switch-grip"
                            width="2"
                            height="8"
                            x="17"
                            y="4" />
                    </g>
                </svg>
                <div className={`subaward-toggle__label ${subActive}`}>
                    Sub Awards
                </div>
            </button>
        );
    }
}
