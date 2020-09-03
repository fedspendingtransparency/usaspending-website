/**
 * ChildRecipientModalTable.jsx
 * Created by Lizzie Salita 6/19/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Sorter from 'components/stateLanding/table/StateLandingTableSorter';

const propTypes = {
    total: PropTypes.number,
    childRecipients: PropTypes.array,
    fy: PropTypes.string,
    updateSort: PropTypes.func,
    sortField: PropTypes.string,
    hideModal: PropTypes.func,
    sortDirection: PropTypes.string
};

export default class ChildRecipientModalTable extends React.Component {
    render() {
        const body = this.props.childRecipients.map((child) => (
            <tr
                className="recipients-list__body-row"
                key={child.duns}>
                <td className="recipients-list__body-cell">
                    <Link to={`/recipient/${child.id}/latest`} onClick={this.props.hideModal}>{child.name}</Link>
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
                    {child.percentage(this.props.total)}
                </td>
            </tr>
        ));

        let timePeriod = `(FY ${this.props.fy})`;
        if (this.props.fy === 'latest') {
            timePeriod = '(Last 12 Months)';
        }
        else if (this.props.fy === 'all') {
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
                                    active={{ field: this.props.sortField, direction: this.props.sortDirection }}
                                    setSort={this.props.updateSort} />
                            </div>
                        </th>
                        <th className="recipients-list__head-cell">
                            <div className="header-cell">
                                <div className="header-cell__text">
                                    <div className="header-cell__title">
                                    DUNS
                                    </div>
                                </div>
                                <Sorter
                                    field="duns"
                                    label="DUNS"
                                    active={{ field: this.props.sortField, direction: this.props.sortDirection }}
                                    setSort={this.props.updateSort} />
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
                                    active={{ field: this.props.sortField, direction: this.props.sortDirection }}
                                    setSort={this.props.updateSort} />
                            </div>
                        </th>
                        <th className="recipients-list__head-cell">
                            <div className="header-cell header-cell_right">
                                <div className="header-cell__text">
                                    <div className="header-cell__title header-cell__title_right">
                                    Transaction Amount
                                        <div className="header-cell__subtitle">
                                            {timePeriod}
                                        </div>
                                    </div>
                                </div>
                                <Sorter
                                    field="_amount"
                                    label="awarded amount"
                                    active={{ field: this.props.sortField, direction: this.props.sortDirection }}
                                    setSort={this.props.updateSort} />
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

ChildRecipientModalTable.propTypes = propTypes;
