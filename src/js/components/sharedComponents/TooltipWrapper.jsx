/**
 * Tooltip.jsx
 * Created by Lizzie Salita 3/8/19
 */

import React from "react";
import PropTypes from "prop-types";
import { throttle } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    children: PropTypes.node,
    tooltipComponent: PropTypes.node,
    left: PropTypes.bool,
    wide: PropTypes.bool,
    icon: PropTypes.string,
    controlledProps: PropTypes.shape({
        isControlled: PropTypes.bool,
        showTooltip: PropTypes.func,
        closeTooltip: PropTypes.func,
        isVisible: PropTypes.bool
    }),
    offsetAdjustments: PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number
    }),
    styles: PropTypes.shape({}) // currently only using width
};

const defaultProps = {
    wide: false,
    verticalCenter: false,
    offsetAdjustments: {
        top: -15, // InfoToolTip offset
        right: 30 // InfoToolTip offset
    },
    controlledProps: {
        isControlled: false
    }
};

const tooltipIcons = {
    info: <FontAwesomeIcon className="tooltip__icon" icon="info-circle" />
};
export default class TooltipWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false,
            offsetTop: 0,
            offsetRight: 0
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
        this.measureOffset = throttle(this.measureOffset.bind(this), 16);
    }

    componentDidMount() {
        this.measureOffset();
        window.addEventListener("scroll", this.measureOffset);
        window.addEventListener("resize", this.measureOffset);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.measureOffset);
        window.removeEventListener("resize", this.measureOffset);
    }

    showTooltip() {
        if (!this.props.controlledProps.isControlled) {
            this.setState({
                showTooltip: true
            });
        }
        else {
            this.props.controlledProps.showTooltip();
        }
    }

    closeTooltip() {
        if (!this.props.controlledProps.isControlled) {
            this.setState({
                showTooltip: false
            });
        }
        else {
            this.props.controlledProps.closeTooltip();
        }
    }

    measureOffset() {
        const tooltipContainer = this.tooltipContainer;
        const offsetTop = tooltipContainer.offsetTop + this.props.offsetAdjustments.top;
        let tooltipWidth = 375;
        // is the tooltip in a section that takes up the full width of the screen?
        const isTooltipJustifiedRight = (window.innerWidth - tooltipContainer.offsetLeft) < window.innerWidth / 6;

        if (this.props.wide && isTooltipJustifiedRight) {
            tooltipWidth = 700;
        }
        else if (this.props.wide) {
            // is there at least 801px of space to the left/right for the tooltip?
            tooltipWidth = (window.innerWidth - (tooltipContainer.offsetLeft + tooltipContainer.clientWidth) > 800)
                ? 650
                : window.innerWidth - (tooltipContainer.offsetLeft + tooltipContainer.clientWidth) - 100;
        }

        let offsetRight = window.innerWidth - tooltipContainer.offsetLeft - tooltipContainer.clientWidth - tooltipWidth - this.props.offsetAdjustments.right;
        if (this.props.left) {
            offsetRight = (window.innerWidth - tooltipContainer.offsetLeft) + tooltipContainer.clientWidth;
        }
        this.setState({
            offsetTop,
            offsetRight,
            width: tooltipWidth
        });
    }

    render() {
        const showTooltip = (this.props.controlledProps.isControlled) ? this.props.controlledProps.isVisible : this.state.showTooltip;
        let tooltip = null;
        const style = {
            top: this.state.offsetTop,
            right: this.state.offsetRight,
            width: this.state.width
        };
        if (showTooltip) {
            tooltip = (
                <div className="tooltip-spacer" style={style}>
                    <div className="tooltip" id="tooltip" role="tooltip">
                        <div className="tooltip__interior">
                            <div
                                className={`tooltip-pointer ${
                                    this.props.left ? "right" : ""
                                }`} />
                            <div className="tooltip__content">
                                <div className="tooltip__message">
                                    {this.props.tooltipComponent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="tooltip-wrapper" style={this.props.styles}>
                <div
                    ref={(div) => {
                        this.tooltipContainer = div;
                    }}>
                    <div
                        role="button"
                        tabIndex="0"
                        className="tooltip__hover-wrapper"
                        onBlur={this.closeTooltip}
                        onFocus={this.showTooltip}
                        onKeyPress={this.showTooltip}
                        onMouseEnter={this.showTooltip}
                        onMouseLeave={this.closeTooltip}
                        onClick={this.showTooltip}>
                        {this.props.children}
                        {this.props.icon && tooltipIcons[this.props.icon]}
                    </div>
                    {tooltip}
                </div>
            </div>
        );
    }
}

TooltipWrapper.defaultProps = defaultProps;
TooltipWrapper.propTypes = propTypes;
