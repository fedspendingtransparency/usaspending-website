/**
 * AlternateNamesRecipientModalTable.jsx
 * Created by Seth Stoudenmier 4/17/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import Sorter from 'components/stateLanding/table/StateLandingTableSorter';

const propTypes = {
    alternateNames: PropTypes.array,
    updateSort: PropTypes.func,
    sortField: PropTypes.string,
    hideModal: PropTypes.func,
    sortDirection: PropTypes.string
};

const AlternateNamesRecipientModalTable = (props) => {
    const body = props.alternateNames.map((altName) => (
        <tr
            className="recipients-list__body-row"
            key={uniqueId(altName)}>
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
                                active={{ field: props.sortField, direction: props.sortDirection }}
                                setSort={props.updateSort} />
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody className="recipients-list__body">
                {body}
            </tbody>
        </table>
    );
};

AlternateNamesRecipientModalTable.propTypes = propTypes;
export default AlternateNamesRecipientModalTable;
