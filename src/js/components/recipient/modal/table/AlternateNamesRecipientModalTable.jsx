/**
 * AlternateNamesRecipientModalTable.jsx
 * Created by Seth Stoudenmier 4/17/20
 */

import React from 'react';
import PropTypes from 'prop-types';

import Sorter from 'components/stateLanding/table/StateLandingTableSorter';

const propTypes = {
    alternateNames: PropTypes.array,
    updateSort: PropTypes.func,
    sortField: PropTypes.string,
    hideModal: PropTypes.func,
    sortDirection: PropTypes.string
};

export default class AlternateNamesRecipientModalTable extends React.Component {
    render() {
        const body = this.props.alternateNames.map((altName) => (
            <tr
                className="recipients-list__body-row"
                key={altName}>
                <td className="recipients-list__body-cell">
                    {altName}
                </td>
            </tr>
        ));

        return (
            <table className="recipients-list">
                <thead className="recipients-list__head">
                    <tr className="recipients-list__head-row">
                        <th className="recipients-list__head-cell">
                            <div className="header-cell">
                                <div className="header-cell__text">
                                    <div className="header-cell__title">
                                    Name
                                    </div>
                                </div>
                                <Sorter
                                    field="alternateName"
                                    label="name"
                                    active={{ field: this.props.sortField, direction: this.props.sortDirection }}
                                    setSort={this.props.updateSort} />
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="recipients-list__body">
                    {body}
                </tbody>
            </table>
        );
    }
}

AlternateNamesRecipientModalTable.propTypes = propTypes;
