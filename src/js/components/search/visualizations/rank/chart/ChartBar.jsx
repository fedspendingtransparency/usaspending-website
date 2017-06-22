/**
 * ChartBar.jsx
 * Created by Kevin Li 2/7/17
 */

import React from 'react';

const propTypes = {
    labelWidth: React.PropTypes.number,
    maxWidth: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    start: React.PropTypes.number,
    index: React.PropTypes.number,
    label: React.PropTypes.string,
    value: React.PropTypes.number,
    description: React.PropTypes.string,
    disableTooltip: React.PropTypes.bool,
    selectItem: React.PropTypes.func,
    deselectItem: React.PropTypes.func
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
            y: (this.props.index * this.props.height) + 20,
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
                    y={20}
                    width={this.props.width}
                    height={20} />
                <rect
                    className="chart-bar-hitzone"
                    x={0}
                    y={0}
                    width={this.props.maxWidth}
                    height={this.props.height}
                    onMouseOver={this.mouseEntered}
                    onMouseOut={this.mouseExited}
                    onTouchStart={this.touchedBar} />
            </g>
        );
    }
}

ChartBar.propTypes = propTypes;
