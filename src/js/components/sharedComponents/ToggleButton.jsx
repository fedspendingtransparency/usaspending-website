/**
 * ToggleButton.jsx
 * Created by Kevin Li 5/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    active: PropTypes.bool,
    pressedToggle: PropTypes.func,
    label: PropTypes.string,
    prefix: PropTypes.string
};

export default class ToggleButton extends React.Component {
    render() {
        let activeClass = '';
        if (this.props.active) {
            activeClass = 'active';
        }
        return (
            <div className="toggle-wrapper">
                <button
                    id={this.props.prefix}
                    className={`toggle-button ${activeClass}`}
                    aria-labelledby={`${this.props.prefix}-label`}
                    aria-pressed={this.props.active}
                    onClick={this.props.pressedToggle}>
                    <div className="toggle-outline">
                        <div className="toggle-slider">
                            <div className="slider-surface">
                                <div className="friction-grabber" />
                                <div className="friction-grabber" />
                                <div className="friction-grabber" />
                            </div>
                        </div>
                    </div>
                </button>
                <label
                    id={`${this.props.prefix}-label`}
                    className="toggle-text"
                    htmlFor={this.props.prefix}>
                    {this.props.label}
                </label>
            </div>
        );
    }
}

ToggleButton.propTypes = propTypes;
