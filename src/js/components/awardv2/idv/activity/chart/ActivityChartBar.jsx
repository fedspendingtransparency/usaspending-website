/**
 * ActivityChartBar.jsx
 * Created by Lizzie Salita 5/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    start: PropTypes.number,
    width: PropTypes.number,
    yPosition: PropTypes.number,
    description: PropTypes.string,
    data: PropTypes.object
};

export default class ActivityChartBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovering: false
        };
    }

    render() {
        // TODO: use this.props.data to create the green obligated section
        return (
            <g
                className="activity-chart-bar"
                aria-label={this.props.description}>
                <desc>
                    {this.props.description}
                </desc>
                <rect
                    className="activity-chart-bar__content"
                    x={this.props.start}
                    y={this.props.yPosition}
                    width={this.props.width}
                    height={10} />
            </g>
        );
    }
}

ActivityChartBar.propTypes = propTypes;
