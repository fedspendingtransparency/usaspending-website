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
    x0: PropTypes.number,
    y0: PropTypes.number
};

export default class ActivityChartBar extends React.Component {
    constructor(props) {
        super(props);

        this.enteredCell = this.enteredCell.bind(this);
        this.exitedCell = this.exitedCell.bind(this);
    }

    enteredCell() {
        const { data } = this.props;
        const x = this.element.getBoundingClientRect().left + (this.props.width / 2);
        const y = this.element.getBoundingClientRect().top + (this.props.height / 2);
        console.log(' This Element : ', this.element);
        console.log(' This Bounding Rect : ', this.element.getBoundingClientRect());
        console.log(' Entering Cell X, Y : ', x, y);
        data.x = this.props.start + (this.props.width / 2);
        data.y = (360 - this.props.yPosition) + (this.props.height / 2);
        this.props.showTooltip({ x, y }, data);
    }

    exitedCell() {
        this.props.hideTooltip();
    }

    render() {
        // TODO: use this.props.data to create the green obligated section
        return (
            <g
                className="activity-chart-bar"
                aria-label={this.props.description}
                onMouseMove={this.enteredCell}
                onMouseLeave={this.exitedCell}
                ref={(g) => {
                    this.element = g;
                }}>
                <desc>
                    {this.props.description}
                </desc>
                <rect
                    className="activity-chart-bar__content"
                    x={this.props.start}
                    y={this.props.yPosition}
                    width={this.props.width}
                    height={this.props.height} />
            </g>
        );
    }
}

ActivityChartBar.propTypes = propTypes;
