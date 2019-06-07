/**
 * ActivityChartBar.jsx
 * Created by Lizzie Salita 5/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
    start: PropTypes.number,
    width: PropTypes.number,
    yPosition: PropTypes.number,
    description: PropTypes.string,
    classNames: PropTypes.object
};

export default class ActivityChartBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovering: false
        };
    }

    render() {
        const classNames = cx(this.props.classNames);
        return (
            <g
                className="activity-chart-bar"
                aria-label={this.props.description}>
                <desc>
                    {this.props.description}
                </desc>
                <rect
                    className={classNames}
                    x={this.props.start}
                    y={this.props.yPosition}
                    width={this.props.width}
                    height={10} />
            </g>
        );
    }
}

ActivityChartBar.propTypes = propTypes;
