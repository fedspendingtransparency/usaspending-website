/**
 * HeaderRow.jsx
 * Created by Lizzie Salita 8/4/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AccountLandingHeaderCellContainer from
    'containers/accountLanding/table/AccountLandingHeaderCellContainer';

const propTypes = {
    columns: PropTypes.array
};

export default class HeaderRow extends React.Component {
    render() {
        const headers = this.props.columns.map((column, i) => (
            <td key={column.columnName}>
                <AccountLandingHeaderCellContainer
                    {...column}
                    isLast={i === this.props.columns.length - 1} />
            </td>
        ));

        return (
            <tr>
                {headers}
            </tr>
        );
    }
}

HeaderRow.propTypes = propTypes;
