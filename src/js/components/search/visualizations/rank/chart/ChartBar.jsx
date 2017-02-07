/**
 * ChartBar.jsx
 * Created by Kevin Li 2/7/17
 */

import React from 'react';

import * as MoneyFormatter from 'helpers/moneyFormatter';

export default class ChartBar extends React.Component {
    render() {
        return (
            <g
                className="chart-bar-group"
                transform={`translate(${this.props.labelWidth + this.props.start},${this.props.index * this.props.height})`}>
                <desc>
                    {`Spending by ${this.props.label}: ${MoneyFormatter.formatMoney(this.props.value)}`}
                </desc>
                <rect
                    className="chart-bar"
                    x={0}
                    y={20}
                    width={this.props.width}
                    height={20} />
            </g>
        );
    }
}