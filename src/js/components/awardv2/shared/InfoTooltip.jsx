/**
 * InfoTooltip.jsx
 * Created by Lizzie Salita 3/8/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    children: PropTypes.node,
    left: PropTypes.bool,
    wide: PropTypes.bool
};

const defaultProps = {
    wide: false
};

export default class InfoTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showInfoTooltip: false,
            offsetTop: 0,
            offsetRight: 0
        };
        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
        this.measureOffset = throttle(this.measureOffset.bind(this), 16);
    }

    componentDidMount() {
        this.measureOffset();
        window.addEventListener('scroll', this.measureOffset);
        window.addEventListener('resize', this.measureOffset);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.measureOffset);
        window.removeEventListener('resize', this.measureOffset);
    }

    showTooltip() {
        if (this.props.children) {
            this.setState({
                showInfoTooltip: true
            });
        }
    }

    closeTooltip() {
        this.setState({
            showInfoTooltip: false
        });
    }

    measureOffset() {
        const targetElement = this.referenceDiv;
        const offsetTop = targetElement.offsetTop - 15;
        let tooltipWidth = 375;
        // is the tooltip in a section that takes up the full width of the screen?
        const isTooltipJustifiedRight = (window.innerWidth - targetElement.offsetLeft) < window.innerWidth / 6;

        if (this.props.wide && isTooltipJustifiedRight) {
            tooltipWidth = 700;
        }
        else if (this.props.wide) {
            // is there at least 801px of space to the left/right for the tooltip?
            tooltipWidth = (window.innerWidth - targetElement.offsetLeft > 800)
                ? 700
                : window.innerWidth - targetElement.offsetLeft - 100;
        }
        let offsetRight = window.innerWidth - targetElement.offsetLeft - targetElement.clientWidth - tooltipWidth - 30;
        if (this.props.left) {
            offsetRight = (window.innerWidth - targetElement.offsetLeft) + targetElement.clientWidth;
        }
        this.setState({
            offsetTop,
            offsetRight,
            width: tooltipWidth
        });
    }

    render() {
        let tooltip = null;
        const style = {
            top: this.state.offsetTop,
            right: this.state.offsetRight,
            width: this.state.width
        };
        if (this.state.showInfoTooltip) {
            tooltip = (
                <div
                    className="info-tooltip-spacer"
                    style={style}>
                    <div
                        className="info-tooltip"
                        id="info-tooltip"
                        role="tooltip">
                        <div className="info-tooltip__interior">
                            <div
                                className={`tooltip-pointer ${
                                    this.props.left ? "right" : ""
                                }`} />
                            <div className="info-tooltip__content">
                                <div className="info-tooltip__message">
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="award__info-wrapper">
                <div
                    ref={(div) => {
                        this.referenceDiv = div;
                    }}>
                    <div
                        role="button"
                        tabIndex="0"
                        onBlur={this.closeTooltip}
                        className="info-tooltip__icon"
                        onFocus={this.showTooltip}
                        onKeyPress={this.showTooltip}
                        onMouseEnter={this.showTooltip}
                        onMouseLeave={this.closeTooltip}
                        onClick={this.showTooltip}>
                        <FontAwesomeIcon icon="info-circle" />
                    </div>
                    {tooltip}
                </div>
            </div>
        );
    }
}

InfoTooltip.defaultProps = defaultProps;
InfoTooltip.propTypes = propTypes;
