/**
 * TableRow.jsx
 * Created by Lizzie Salita 08/01/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import AgencyLinkCell from './cells/AgencyLinkCell';
import GenericCell from './cells/GenericCell';

const propTypes = {
    columns: PropTypes.array.isRequired,
    agency: PropTypes.object,
    rowIndex: PropTypes.number.isRequired,
    agencySearchString: PropTypes.string
};

export default class TableRow extends React.PureComponent {
    render() {
        let rowClass = 'row-even';
        if (this.props.rowIndex % 2 === 0) {
            rowClass = 'row-odd';
        }
        const cells = this.props.columns.map((column) => {
            // BODGE: Disable Department of Transportation in agency list
            if (column.columnName === 'agency_name') {
                // show the agency link cell
                return (
                    <td
                        className={rowClass}
                        key={`${column.columnName}-${this.props.agency.agency_id}`}>
                        <AgencyLinkCell
                            rowIndex={this.props.rowIndex}
                            name={this.props.agency.agency_name}
                            id={this.props.agency.agency_id}
                            agencySearchString={this.props.agencySearchString}
                            disabled={this.props.agency.agency_name === 'Department of Transportation (DOT)'}
                            column={column.columnName} />
                    </td>
                );
            }
            return (
                <td
                    className={rowClass}
                    key={`${column.columnName}-${this.props.agency.agency_id}`}>
                    <GenericCell
                        rowIndex={this.props.rowIndex}
                        data={this.props.agency.display[column.columnName]}
                        column={column.columnName} />
                </td>
            );
        });

        return (
            <tr>
                {cells}
            </tr>
        );
    }
}

TableRow.propTypes = propTypes;
