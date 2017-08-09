/**
 * HeaderRow.jsx
 * Created by Lizzie Salita 08/01/17
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AgencyLandingHeaderCellContainer from
    'containers/agencyLanding/table/AgencyLandingHeaderCellContainer';

const propTypes = {
    columns: PropTypes.array
};

export default class HeaderRow extends React.Component {
    render() {
        const headers = this.props.columns.map((column, i) => (
            <td key={column.columnName}>
                <AgencyLandingHeaderCellContainer
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
