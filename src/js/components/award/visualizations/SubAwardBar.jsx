/**
 * SubAwardBar.jsx
 * Created by Emily Gullo 02/13/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as MoneyFormatter from 'helpers/moneyFormatter';

const propTypes = {
    x: PropTypes.string,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    dataY: PropTypes.number
};

export default class SubAwardBar extends React.Component {

    render() {
        const formattedValue = MoneyFormatter.formatMoney(this.props.dataY);
        return (
            <g aria-label={formattedValue} className="sub">
                <desc>Sub Award Amounts</desc>
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
SubAwardBar.propTypes = propTypes;
