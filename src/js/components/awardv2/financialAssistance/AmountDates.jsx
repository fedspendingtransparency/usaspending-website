/**
 * AmountDates.jsx
 * Created by David Trinh 10/12/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import FinancialAmounts from './FinancialAmounts';
import FinancialDates from './FinancialDates';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class AmountDates extends React.Component {
    render() {
        return (
            <div className="award__col award-amountdates">
                <FinancialAmounts selectedAward={this.props.selectedAward} />
                <FinancialDates selectedAward={this.props.selectedAward} />
            </div>
        );
    }
}
AmountDates.propTypes = propTypes;
