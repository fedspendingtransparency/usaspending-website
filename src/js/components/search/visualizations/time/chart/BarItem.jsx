/**
 * BarItem.jsx
 * Created by Kevin Li
 */

import React from 'react';
import Accounting from 'accounting';

const propTypes = {
    dataY: React.PropTypes.number,
    dataX: React.PropTypes.string,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number
};

export default class BarItem extends React.Component {
    render() {
        const formattedValue = Accounting.formatMoney(this.props.dataY, {
            symbol: '$',
            precision: 0,
            format: {
                pos: '%s%v',
                neg: '-%s%v'
            }
        });

        return (
            <g>
                <title>{formattedValue}</title>
                <desc>Spending in {this.props.dataX}: {formattedValue}</desc>
                <rect
                    className="bar-item"
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.height} />
            </g>
        );
    }
}

BarItem.propTypes = propTypes;
