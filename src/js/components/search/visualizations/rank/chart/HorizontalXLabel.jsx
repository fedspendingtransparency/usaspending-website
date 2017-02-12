/**
 * HorizontalXLabel.jsx
 * Created by Kevin Li 2/6/17
 */

import React from 'react';

const propTypes = {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    height: React.PropTypes.number,
    label: React.PropTypes.string,
    alignment: React.PropTypes.string
};

const defaultProps = {
    alignment: 'middle'
};

export default class HorizontalXLabel extends React.Component {
    render() {
        return (
            <g
                className="x-label"
                transform={`translate(${this.props.x},${this.props.y})`}>
                <line
                    className="grid-line"
                    x1={0}
                    x2={0}
                    y1={-1 * this.props.height}
                    y2={0} />
                <g transform="translate(0, 20)">
                    <text textAnchor={this.props.alignment}>
                        {this.props.label}
                    </text>
                </g>
            </g>
        );
    }
}

HorizontalXLabel.propTypes = propTypes;
HorizontalXLabel.defaultProps = defaultProps;
