/**
 * TableRow.jsx
 * Created by Lizzie Salita 08/01/17
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                            column={column.columnName} />
                    </td>
                );
            }
            if (column.columnName === 'congressional_justification_url') {
                if (this.props.agency.display[column.columnName] !== 'not available') {
                    return (
                        <td
                            className={rowClass}
                            key={`${column.columnName}-${this.props.agency.agency_id}`}>
                            <div className={`column-${column.columnName}`}>
                                <div className="cell-content">
                                    <a
                                        href={`${this.props.agency.display[column.columnName]}`}
                                        target="_blank">
                                        {`${this.props.agency.display[column.columnName]} `}
                                        <FontAwesomeIcon icon="external-link-alt" />
                                    </a>
                                </div>
                            </div>
                        </td>
                    );
                }
                return (
                    <td
                        className={rowClass}
                        key={`${column.columnName}-${this.props.agency.agency_id}`}>
                        {this.props.agency.display[column.columnName]}
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
