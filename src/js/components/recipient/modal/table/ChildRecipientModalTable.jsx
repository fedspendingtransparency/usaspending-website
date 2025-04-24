/**
 * ChildRecipientModalTable.jsx
 * Created by Lizzie Salita 6/19/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Sorter from 'components/stateLanding/table/StateLandingTableSorter';
import GlobalConstants from '../../../../GlobalConstants';

const propTypes = {
    total: PropTypes.number,
    childRecipients: PropTypes.array,
    fy: PropTypes.string,
    updateSort: PropTypes.func,
    sortField: PropTypes.string,
    hideModal: PropTypes.func,
    sortDirection: PropTypes.string
};

const ChildRecipientModalTable = (props) => {
    const body = props.childRecipients.map((child) => (
        <tr
            className="recipients-list__body-row"
            key={child.uei}>
            <td className="recipients-list__body-cell">
                <Link to={`/recipient/${child.id}/latest`} onClick={props.hideModal}>{child.name}</Link>
            </td>
            <td className="recipients-list__body-cell">
                {child.uei}
            </td>
            <td className="recipients-list__body-cell">
                {child.duns}
            </td>
            <td className="recipients-list__body-cell">
                {child.stateProvince}
            </td>
            <td className="recipients-list__body-cell recipients-list__body-cell_right">
                {child.amount}
            </td>
            <td className="recipients-list__body-cell recipients-list__body-cell_right">
                {child.percentage(props.total)}
            </td>
        </tr>
    ));

    let timePeriod = `(FY ${props.fy})`;
    if (props.fy === 'latest') {
        timePeriod = '(Last 12 Months)';
    }
    else if (props.fy === 'all') {
        timePeriod = '(All Fiscal Years)';
    }
    return (
        <table className="recipients-list">
            <thead className="recipients-list__head">
                <tr className="recipients-list__head-row">
                    <th className="recipients-list__head-cell">
                        <div className="header-cell">
                            <div className="header-cell__text">
                                <div className="header-cell__title">
                                Recipient Name
                                </div>
                            </div>
                            <Sorter
                                field="name"
                                label="recipient name"
                                active={{ field: props.sortField, direction: props.sortDirection }}
                                setSort={props.updateSort} />
                        </div>
                    </th>
                    <th className="recipients-list__head-cell">
                        <div className="header-cell">
                            <div className="header-cell__text">
                                <div className="header-cell__title">
                                    UEI
                                </div>
                            </div>
                            <Sorter
                                field="uei"
                                label="UEI"
                                active={{ field: props.sortField, direction: props.sortDirection }}
                                setSort={props.updateSort} />
                        </div>
                    </th>
                    <th className="recipients-list__head-cell">
                        <div className="header-cell">
                            <div className="header-cell__text">
                                <div className="header-cell__title">
                                    {GlobalConstants.DUNS_LABEL}DUNS
                                </div>
                            </div>
                            <Sorter
                                field="duns"
                                label="DUNS"
                                active={{ field: props.sortField, direction: props.sortDirection }}
                                setSort={props.updateSort} />
                        </div>
                    </th>
                    <th className="recipients-list__head-cell">
                        <div className="header-cell">
                            <div className="header-cell__text">
                                <div className="header-cell__title">
                                State
                                </div>
                            </div>
                            <Sorter
                                field="stateProvince"
                                label="state"
                                active={{ field: props.sortField, direction: props.sortDirection }}
                                setSort={props.updateSort} />
                        </div>
                    </th>
                    <th className="recipients-list__head-cell">
                        <div className="header-cell header-cell_right">
                            <div className="header-cell__text">
                                <div className="header-cell__title header-cell__title_right header-cell__longer-title">
                                Transaction Amount
                                    <div className="header-cell__subtitle">
                                        {timePeriod}
                                    </div>
                                </div>
                            </div>
                            <Sorter
                                field="_amount"
                                label="awarded amount"
                                active={{ field: props.sortField, direction: props.sortDirection }}
                                setSort={props.updateSort} />
                        </div>
                    </th>
                    <th className="recipients-list__head-cell">
                        <div className="header-cell  header-cell_right">
                            <div className="header-cell__text">
                                <div className="header-cell__title header-cell__title_right">
                                Percent
                                </div>
                            </div>
                            <Sorter
                                field="_amount"
                                label="percent of total"
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

ChildRecipientModalTable.propTypes = propTypes;
export default ChildRecipientModalTable;
