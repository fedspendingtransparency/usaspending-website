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
    styles: PropTypes.shape({}), // currently only using width
    verticalCenter: PropTypes.bool // vertically centers tooltip content relative to this.props.children
};

const defaultProps = {
    wide: false,
    verticalCenter: false
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
        this.setState({
            showTooltip: true
        });
    }

    closeTooltip() {
        this.setState({
            showTooltip: true
        });
    }

    measureOffset() {
        const ttContainer = this.tooltipContainer;
        const offsetBottom = ttContainer.clientHeight;

        let tooltipWidth = 375;
        if (this.props.wide) {
            tooltipWidth = (window.innerWidth - ttContainer.offsetLeft > 700)
                ? 700
                : window.innerWidth - ttContainer.offsetLeft - 100;
        }
        let offsetLeft = ttContainer.clientWidth + 15;
        if (this.props.left) {
            offsetLeft = (window.innerWidth - ttContainer.offsetLeft) + ttContainer.clientWidth;
        }
        this.setState({
            offsetBottom,
            offsetLeft,
            width: tooltipWidth
        });
    }

    render() {
        let tooltip = null;
        const style = {
            bottom: this.state.offsetBottom,
            left: this.state.offsetLeft,
            width: this.state.width
        };
        if (this.state.showTooltip) {
            tooltip = (
                <div className="tooltip-spacer" style={style}>
                    <div
                        className="tooltip"
                        id="tooltip"
                        role="tooltip">
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
                        onBlur={this.closeTooltip}
                        className="tooltip__hover-wrapper"
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
