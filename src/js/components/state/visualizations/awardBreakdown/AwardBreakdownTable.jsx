/**
 * AwardBreakdownTable.jsx
 * Created by Lizzie Salita 5/17/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseAwardBreakdownRow from 'models/v2/state/BaseAwardBreakdownRow';

const propTypes = {
    awardBreakdown: PropTypes.array
};

export default class AwardBreakdownTable extends React.Component {
    constructor(props) {
        super(props);

        this.generateRows = this.generateRows.bind(this);
    }

    generateRows() {
        return this.props.awardBreakdown.map((awardType) => {
            const row = Object.create(BaseAwardBreakdownRow);
            row.populate(awardType);
            return (
                <tr key={row.type}>
                    <td>{row.name}</td>
                    <td>{row.amount}</td>
                    <td>{row.count}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <table className="award-breakdown__table">
                <thead>
                    <tr>
                        <th>Award Type</th>
                        <th>Amount</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {this.generateRows()}
                </tbody>
            </table>
        );
    }
}

AwardBreakdownTable.propTypes = propTypes;
