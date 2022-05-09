/**
 * PointItem.jsx
 * Created by Lizzie Salita 7/17/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const defaultProps = {
    active: false
};

const propTypes = {
    identifier: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    color: PropTypes.string,
    stroke: PropTypes.string,
    radius: PropTypes.number,
    strokeWidth: PropTypes.number,
    description: PropTypes.string,
    selectPoint: PropTypes.func,
    deselectPoint: PropTypes.func,
    deregisterPoint: PropTypes.func
};

export default class PointItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.mouseEntered = this.mouseEntered.bind(this);
        this.mouseExited = this.mouseExited.bind(this);
        this.touchedPoint = this.touchedPoint.bind(this);
    }

    componentWillUnmount() {
        this.props.deregisterPoint(this.props.identifier);
    }

    mouseEntered() {
        this.props.selectPoint(this.props.identifier);
    }

    mouseExited() {
        this.props.deselectPoint();
    }

    touchedPoint() {
    // fallback for touch interfaces, which don't have hover capability
        this.props.selectPoint(this.props.identifier, true);
    }

    updateActive(currentActive) {
        this.setState({
            active: currentActive === this.props.identifier
        });
    }

    render() {
        let hoverClass = '';
        if (this.state.active) {
            hoverClass = ' hover';
        }
        return (
            <g aria-label={this.props.description}>
                <desc>{this.props.description}</desc>
                <circle
                    className={`point-item${hoverClass}`}
                    cx={this.props.x}
                    cy={this.props.y}
                    r={this.props.radius}
                    stroke={this.props.stroke}
                    strokeWidth={this.props.strokeWidth}
                    fill={this.props.color}
                    tabIndex={-1}
                    onFocus={this.mouseEntered}
                    onBlur={this.mouseExited}
                    onMouseEnter={this.mouseEntered}
                    onMouseOut={this.mouseExited}
                    onTouchStart={this.touchedPoint} />
            </g>
        );
    }
}

PointItem.propTypes = propTypes;
PointItem.defaultProps = defaultProps;
