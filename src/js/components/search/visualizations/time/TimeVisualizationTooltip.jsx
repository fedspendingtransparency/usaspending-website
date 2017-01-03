/**
 * TimeVisualizationTooltip.jsx
 * Created by Kevin Li 12/30/16
 */

import React from 'react';
import Accounting from 'accounting';

export default class TimeVisualizationTooltip extends React.Component {
    render() {
        const position = {
            top: `${this.props.y}px`,
            left: `${this.props.x}px`
        };

        const accountingOptions = {
            symbol: '$',
            precision: 0,
            format: {
                pos: '%s%v',
                neg: '-%s%v'
            }
        };

        const dollarValue = Accounting.formatMoney(this.props.data.yValue, accountingOptions);

        return (
            <div className="visualization-tooltip">
                <div className="tooltip" style={position}>
                    <div className="tooltip-title">
                        {this.props.data.xValue}
                    </div>
                    <div className="tooltip-body">
                        <div className="tooltip-left">
                            {dollarValue}
                        </div>
                        <div className="tooltip-right">
                            {Math.round(this.props.data.percentage * 1000) / 10}%
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
