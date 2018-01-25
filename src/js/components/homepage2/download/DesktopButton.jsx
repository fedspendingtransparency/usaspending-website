/**
 * DesktopButton.jsx
 * Created by Kevin Li 1/25/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    code: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    enabled: PropTypes.bool,
    active: PropTypes.bool,
    changeActiveItem: PropTypes.func,
    forceClear: PropTypes.func
};

export default class DesktopButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovering: false,
            isFocused: false
        };

        this.onHover = this.onHover.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.endHover = this.endHover.bind(this);
        this.endFocus = this.endFocus.bind(this);
        this.pressedEsc = this.pressedEsc.bind(this);
    }

    onHover() {
        this.props.changeActiveItem(this.props.index);
        this.setState({
            isHovering: true
        });
    }

    onFocus() {
        this.setState({
            isFocused: true
        });
        this.onHover();
    }

    endHover() {
        this.setState({
            isHovering: false
        });
    }

    endFocus() {
        this.setState({
            isFocused: false
        });
        this.endHover();
    }

    pressedEsc(e) {
        if (!this.state.isHovering || !this.props.active) {
            // not selected
            return;
        }
        else if (!this.isFocused) {
            // only respond while focused
            return;
        }

        if (e.key === 'Escape') {
            this.endHover();
            this.props.forceClear();
        }
    }

    render() {
        const iconActive = this.props.active || this.state.isHovering ? '-active' : '';
        const buttonActive = this.props.active || this.state.isHovering ? 'desktop-download__active' : '';
        return (
            <button
                className={`homepage-download__button desktop-download ${buttonActive}`}
                disabled={!this.props.enabled}
                onMouseOver={this.onHover}
                onMouseLeave={this.endHover}
                onFocus={this.onFocus}
                onBlur={this.endFocus}
                onKeyDown={this.pressedEsc}>
                <div className={`homepage-download__icon homepage-download__icon_type_${this.props.code}${iconActive}`} />
                <div className="homepage-download__button-label">
                    {this.props.label}
                </div>
            </button>
        );
    }
}

DesktopButton.propTypes = propTypes;
