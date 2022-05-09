/**
 * DirectionLabel.jsx
 * Created by Kevin Li 3/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    paddingX: PropTypes.number,
    title: PropTypes.string,
    children: PropTypes.element
};

const defaultProps = {
    x: 0,
    y: 0
};

export default class DirectionLabel extends React.Component {
    render() {
        return (
            <g
                className="direction-label"
                transform={`translate(${this.props.x},${this.props.y})`}>
                <text
                    className="title"
                    x={0}
                    y={0}
                    aria-label={this.props.title}>
                    {this.props.title.toUpperCase()}
                </text>
                <g
                    className="direction-icon"
                    transform={`translate(${this.props.paddingX},-10) scale(0.016 0.016)`}>
                    {this.props.children}
                </g>
            </g>
        );
    }
}

DirectionLabel.propTypes = propTypes;
DirectionLabel.defaultProps = defaultProps;
