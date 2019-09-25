/**
 * ActivityChartBar.jsx
 * Created by Lizzie Salita 5/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    start: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    yPosition: PropTypes.number,
    description: PropTypes.string,
    data: PropTypes.object,
    showTooltip: PropTypes.func,
    hideTooltip: PropTypes.func,
    style: PropTypes.object,
    pattern: PropTypes.object
};

export default class ActivityChartBar extends React.Component {
    constructor(props) {
        super(props);

        this.enteredCell = this.enteredCell.bind(this);
        this.exitedCell = this.exitedCell.bind(this);
    }

    enteredCell() {
        this.props.showTooltip(this.props.data);
    }

    exitedCell() {
        this.props.hideTooltip(this.props.data);
    }

    render() {
        return (
            <g
                className="activity-chart-bar"
                aria-label={this.props.description}
                onMouseMove={this.enteredCell}
                onMouseLeave={this.exitedCell}
                ref={(g) => {
                    this.element = g;
                }}>
                <defs>{this.props.pattern}</defs>
                <desc>
                    {this.props.description}
                </desc>
                <rect
                    style={this.props.style}
                    x={this.props.start}
                    y={this.props.yPosition}
                    width={this.props.width}
                    height={this.props.height} />
            </g>
        );
    }
}

ActivityChartBar.propTypes = propTypes;
