/**
 * AwardBreakdownTable.jsx
 * Created by Lizzie Salita 5/17/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    awardBreakdown: PropTypes.array,
    hasNegatives: PropTypes.bool
};

export default class AwardBreakdownTable extends React.Component {
    constructor(props) {
        super(props);

        this.generateRows = this.generateRows.bind(this);
    }

    generateRows() {
        return this.props.awardBreakdown.map((row) => (
            <tr
                className="award-breakdown-table__row"
                key={row.type}>
                <td className="award-breakdown-table__data">{row.name}</td>
                <td className="award-breakdown-table__data">{row.amount}</td>
                <td className="award-breakdown-table__data">{row.count}</td>
            </tr>
        ));
    }

    render() {
        let greatThanOneHundredDescription = null;
        if (this.props.hasNegatives) {
            greatThanOneHundredDescription = (
                <p>
                    <em><strong>Note:</strong> The award types above add up to more
                        than 100% due to negative values not shown here.
                    </em>
                </p>
            );
        }
        return (
            <>
                <table className="award-breakdown-table">
                    <thead className="award-breakdown-table__head">
                        <tr className="award-breakdown-table__row">
                            <th className="award-breakdown-table__header-cell">Award Type</th>
                            <th className="award-breakdown-table__header-cell">Amount</th>
                            <th className="award-breakdown-table__header-cell">Count</th>
                        </tr>
                    </thead>
                    <tbody className="award-breakdown-table__body">
                        {this.generateRows()}
                    </tbody>
                </table>
                {greatThanOneHundredDescription}
            </>
        );
    }
}

AwardBreakdownTable.propTypes = propTypes;
