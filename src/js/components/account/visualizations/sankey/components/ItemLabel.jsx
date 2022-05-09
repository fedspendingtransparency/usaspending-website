/**
 * ItemLabel.jsx
 * Created by Kevin Li 3/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    hide: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.string
};

const defaultProps = {
    x: 0,
    y: 0,
    hide: false
};

export default class ItemLabel extends React.Component {
    render() {
        if (this.props.hide) {
            return null;
        }

        return (
            <g
                className="item-label"
                transform={`translate(${this.props.x},${this.props.y})`}>
                <text
                    className="title"
                    x={0}
                    y={0}>
                    {this.props.title}
                </text>
                <text
                    className="value"
                    x={0}
                    y={16}>
                    {this.props.value}
                </text>
            </g>
        );
    }
}

ItemLabel.propTypes = propTypes;
ItemLabel.defaultProps = defaultProps;
