/**
 * RecipientModalTable.jsx
 * Created by Lizzie Salita 6/19/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    sortField: PropTypes.string,
    sortDirection: PropTypes.string,
    updateSort: PropTypes.func,
    fy: PropTypes.string,
    total: PropTypes.number,
    childRecipients: PropTypes.array
};

export default class RecipientModalTable extends React.Component {
    render() {
        const rows = this.props.childRecipients.map((child) => {
            const percent = (child._amount / this.props.total) * 100;
            return (
                <tr
                    key={child.duns}>
                    <td>
                        {child.name}
                    </td>
                    <td>
                        {child.duns}
                    </td>
                    <td>
                        {child.stateProvince}
                    </td>
                    <td>
                        {child.amount}
                    </td>
                    <td>
                        {percent}%
                    </td>
                </tr>
            );
        });
        return (
            <table className="child-recipients-table">
                <thead>
                    <tr>
                        <th>
                            Recipient Name
                        </th>
                        <th>
                            DUNS
                        </th>
                        <th>
                            State
                        </th>
                        <th>
                            Award Amount
                            <div>({this.props.fy})</div>
                        </th>
                        <th>
                            Percent
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

RecipientModalTable.propTypes = propTypes;
