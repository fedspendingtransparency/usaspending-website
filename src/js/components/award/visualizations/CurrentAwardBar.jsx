/**
 * CurrentAwardBar.jsx
 * Created by Emily Gullo 02/13/2017
 **/

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    x: React.PropTypes.string,
    y: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    dataY: React.PropTypes.number
};

export default class CurrentAwardBar extends React.Component {

    render() {
        const formattedValue = MoneyFormatter.formatMoney(this.props.dataY);
        return (
            <g aria-label={formattedValue} className="current">
                <desc>Current Award Amounts</desc>
                <rect
                    className={`bar-item`}
                    x={this.props.x}
                    y={this.props.y}
                    width={this.props.width}
                    height={this.props.height} />
            </g>
        );
    }
}
CurrentAwardBar.propTypes = propTypes;
