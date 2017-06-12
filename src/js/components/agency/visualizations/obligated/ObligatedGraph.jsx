/**
 * ObligatedGraph.jsx
 * Created by Lizzie Salita 6/12/17
 */

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import HorizontalBarItem from './HorizontalBarItem';


const propTypes = {
    activeFY: React.PropTypes.number,
    obligatedAmount: React.PropTypes.number,
    budgetAuthority: React.PropTypes.number,
    width: React.PropTypes.number,
    obligatedText: React.PropTypes.string
};

export default class AgencyObligatedGraph extends React.Component {
    render() {
        const obligatedValue = this.props.obligatedAmount;
        const authorityValue = this.props.budgetAuthority;
        const remainderValue = authorityValue - obligatedValue;

        const obligatedPercent = (obligatedValue / authorityValue);
        const obligatedWidth = this.props.width * obligatedPercent;
        const remainderWidth = this.props.width - obligatedWidth;

        const remainderUnits = MoneyFormatter.calculateUnitForSingleValue(remainderValue);
        const remainder = `${MoneyFormatter.formatMoney(remainderValue / remainderUnits.unit)}
        ${remainderUnits.longLabel}`;

        const obligatedDescription = `${this.props.obligatedText} Obligated`;
        const remainderDescription = `${remainder} Remaining`;

        return (
            <svg className="horizontal-bar">
                <g>
                    <HorizontalBarItem
                        description={obligatedDescription}
                        x={0}
                        y={0}
                        width={obligatedWidth}
                        color="#5C7480" />
                    <HorizontalBarItem
                        description={remainderDescription}
                        x={obligatedWidth}
                        y={0}
                        width={remainderWidth}
                        color="#D6D7D9" />
                </g>
            </svg>
        );
    }
}

AgencyObligatedGraph.propTypes = propTypes;
