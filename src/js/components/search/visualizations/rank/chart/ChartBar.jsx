/**
 * ChartBar.jsx
 * Created by Kevin Li 2/7/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    labelWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    start: PropTypes.number,
    index: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.number,
    description: PropTypes.string,
    disableTooltip: PropTypes.bool,
    selectItem: PropTypes.func,
    deselectItem: PropTypes.func
};

export default class ChartBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovering: false
        };

        this.mouseEntered = this.mouseEntered.bind(this);
        this.mouseExited = this.mouseExited.bind(this);
        this.touchedBar = this.touchedBar.bind(this);
    }

    mouseEntered() {
        if (this.props.disableTooltip) {
            return;
        }

        this.setState({
            isHovering: true
        }, () => {
            this.showTooltip();
        });
    }

    mouseExited() {
        if (this.props.disableTooltip) {
            return;
        }

        this.setState({
            isHovering: false
        }, () => {
            this.hideTooltip();
        });
    }

    touchedBar() {
        if (this.props.disableTooltip) {
            return;
        }

        this.setState({
            isHovering: !this.state.isHovering
        }, () => {
            if (this.state.isHovering) {
                this.showTooltip();
            }
            else {
                this.hideTooltip();
            }
        });
    }

    showTooltip() {
        this.props.selectItem({
            label: this.props.label,
            value: this.props.value,
            y: (this.props.index * this.props.height) + 12,
            x: (this.props.width / 2) + this.props.start + this.props.labelWidth
        });
    }

    hideTooltip() {
        this.props.deselectItem();
    }

    render() {
        let hoverClass = '';
        if (this.state.isHovering) {
            hoverClass = 'hover';
        }

        return (
            <g
                className="chart-bar-group"
                transform={`translate(${this.props.labelWidth},${this.props.index * this.props.height})`}
                aria-label={this.props.description}>
                <desc>
                    {this.props.description}
                </desc>
                <rect
                    className={`chart-bar ${hoverClass}`}
                    x={this.props.start}
                    y={12}
                    width={this.props.width}
                    height={12} />
                <rect
                    className="chart-bar-hitzone"
                    x={0}
                    y={0}
                    width={this.props.maxWidth}
                    height={this.props.height}
                    tabIndex={-1}
                    onMouseOver={this.mouseEntered}
                    onMouseOut={this.mouseExited}
                    onFocus={this.mouseEntered}
                    onBlur={this.mouseExited}
                    onTouchStart={this.touchedBar} />
            </g>
        );
    }
}

ChartBar.propTypes = propTypes;
