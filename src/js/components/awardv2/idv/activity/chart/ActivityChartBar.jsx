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
    isObligated: PropTypes.bool
};

export default class ActivityChartBar extends React.Component {
    constructor(props) {
        super(props);

        this.enteredCell = this.enteredCell.bind(this);
        this.exitedCell = this.exitedCell.bind(this);
    }

    enteredCell() {
        const { data } = this.props;
        // get bar left position and add half the width to center position the tooltip
        const x = this.element.getBoundingClientRect().left + (this.props.width / 2);
        // get bar top position and add half the height of the bar to center position the tooltip
        const y = this.element.getBoundingClientRect().top + (this.props.height / 2);
        data.x = this.props.start + (this.props.width / 2);
        data.y = (360 - this.props.yPosition) + (this.props.height / 2);
        // TODO - verify you still need the first param position { x, y }
        this.props.showTooltip({ x, y }, data);
    }

    exitedCell() {
        this.props.hideTooltip();
    }

    render() {
        console.log(' Props : ', this.props);
        let classNames = 'activity-chart-bar__awarded-content';
        if (this.props.isObligated) classNames = 'activity-chart-bar__obligated-content';
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
                    className={classNames}
                    x={this.props.start}
                    y={this.props.yPosition}
                    width={this.props.width}
                    height={this.props.height} />
            </g>
        );
    }
}

ActivityChartBar.propTypes = propTypes;
