/**
 * DesktopButton.jsx
 * Created by Kevin Li 1/25/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

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

        this.onHover = this.onHover.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.pressedEsc = this.pressedEsc.bind(this);
    }

    onHover() {
        this.props.changeActiveItem(this.props.index);
    }

    onFocus() {
        this.onHover();
    }

    pressedEsc(e) {
        if (!this.props.active) {
            // not selected
            return;
        }

        if (e.key === 'Escape') {
            this.props.forceClear();
        }
    }

    render() {
        const iconActive = this.props.active ? '-active' : '';
        const buttonActive = this.props.active ? 'desktop-download__active' : '';

        const disabled = !this.props.enabled;
        let comingSoon = null;
        if (disabled) {
            comingSoon = (
                <div className="homepage-download__coming-soon">
                    <Icons.InfoCircle />&nbsp;Coming Soon
                </div>
            );
        }

        return (
            <button
                className={`homepage-download__button desktop-download ${buttonActive}`}
                disabled={disabled}
                onMouseOver={this.onHover}
                onFocus={this.onHover}
                onKeyDown={this.pressedEsc}>
                <div className={`homepage-download__icon homepage-download__icon_type_${this.props.code}${iconActive}`} />
                <div className="homepage-download__button-label">
                    {this.props.label}
                    {comingSoon}
                </div>
            </button>
        );
    }
}

DesktopButton.propTypes = propTypes;
