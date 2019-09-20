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
        right: PropTypes.number,
        left: PropTypes.number
    }),
    styles: PropTypes.shape({}) // currently only using width
};

const defaultProps = {
    wide: false,
    verticalCenter: false,
    offsetAdjustments: {
        top: -15, // InfoToolTip offset
        right: 30, // InfoToolTip offset
        left: 0
    },
    controlledProps: {
        isControlled: false
    }
};

const horizontalPadding = 20;

const tooltipIcons = {
    info: <FontAwesomeIcon className="tooltip__icon" icon="info-circle" />
};
export default class TooltipWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false,
            offsetTop: 0
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

    showTooltip(e) {
        if (!this.props.controlledProps.isControlled) {
            this.setState({
                showTooltip: true
            });
        }
        else {
            this.props.controlledProps.showTooltip(e);
        }
    }

    closeTooltip(e) {
        if (!this.props.controlledProps.isControlled) {
            this.setState({
                showTooltip: false
            });
        }
        else {
            this.props.controlledProps.closeTooltip(e);
        }
    }

    measureOffset() {
        let tooltipWidth = 375;
        const tooltipContainer = this.tooltipContainer;
        const ttContainerWidth = tooltipContainer.clientWidth;

        const offsetTop = tooltipContainer.offsetTop + this.props.offsetAdjustments.top;
        const totalSpace = window.innerWidth;
        const spaceToRight = (totalSpace - tooltipContainer.offsetLeft) - ttContainerWidth;
        const spaceToLeft = tooltipContainer.offsetLeft;

        if (this.props.wide && this.props.left) {
            tooltipWidth = (spaceToLeft > 800)
                ? 700
                : spaceToLeft - 100;
        }
        else if (this.props.wide) {
            tooltipWidth = (spaceToRight > 800)
                ? 700
                : spaceToRight - 100;
        }

        if (this.props.left) {
            // minus tooltipWidth b/c right corner of toolTip is flush w/ left edge of toolTip container
            const startingPositionLeft = spaceToLeft - tooltipWidth;
            this.setState({
                offsetTop,
                offsetLeft: startingPositionLeft - horizontalPadding,
                width: tooltipWidth
            });
        }
        else {
            // plus ttContainerWidth b/c left corner of toolTip is flush w/ right edge of toolTip container
            const startingPositionLeft = spaceToLeft + ttContainerWidth;
            this.setState({
                offsetTop,
                offsetLeft: startingPositionLeft + horizontalPadding,
                width: tooltipWidth
            });
        }
    }

    render() {
        const showTooltip = (this.props.controlledProps.isControlled) ? this.props.controlledProps.isVisible : this.state.showTooltip;
        let tooltip = null;
        const style = Object.keys(this.state)
            .filter((key) => ['offsetTop', 'offsetLeft', 'width'].includes(key))
            .reduce((acc, item) => {
                if (item === 'offsetLeft') return { ...acc, left: this.state[item] };
                if (item === 'offsetTop') return { ...acc, top: this.state[item] };
                return { ...acc, [item]: this.state[item] };
            }, {});
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
