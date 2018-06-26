/**
 * RecipientOverview.jsx
 * Created by Lizzie Salita 8/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { CaretRight, Glossary } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    recipient: PropTypes.object,
    showModal: PropTypes.func
};

export default class RecipientOverview extends React.Component {
    render() {
        const recipient = this.props.recipient.overview;
        let label = (
            <div className="recipient-overview__label">
                Recipient
            </div>
        );
        let viewChildren = null;
        let parent = null;
        if (recipient.parentName && recipient.parentDuns) {
            // This is a child recipient
            label = (
                <div className="recipient-overview__label recipient-overview__label_child">
                    Child Recipient
                </div>
            );
            parent = (
                <div className="recipient-overview__parent">
                    This recipient is a child of <a className="recipient-overview__parent-link" href={`#/recipient/${recipient.parentDuns}`}>{recipient.parentName} ({recipient.parentDuns})</a>
                </div>
            );
        }
        if (this.props.recipient.children && this.props.recipient.children.length > 0) {
            // This is a parent recipient
            label = (
                <a
                    href={`#/recipient/${this.props.recipient.id}/?glossary=parent-duns`}
                    className="recipient-overview__label recipient-overview__label_parent">
                    Parent Recipient <Glossary />
                </a>
            );
            viewChildren = (
                <button
                    className="recipient-overview__children-button"
                    onClick={this.props.showModal}>
                    View child recipients <CaretRight />
                </button>
            );
        }
        return (
            <div
                id="recipient-overview"
                className="recipient-section recipient-overview">
                <h2 className="recipient-overview__title">
                    {recipient.name}
                </h2>
                <hr className="results-divider" />
                <div className="recipient-overview__content">
                    {parent}
                    <div className="recipient-overview__children">
                        {label}
                        {viewChildren}
                    </div>
                    <div className="recipient-section__row">
                        <div className="recipient-section__viz totals">
                            <h3 className="recipient-overview__heading">
                                Total Awarded Amount
                            </h3>
                            <div className="totals__amount">
                                {recipient.totalAmount}
                            </div>
                            <div className="totals__awards">
                                from <span className="state-overview__total">{recipient.totalAwards}</span> prime awards
                            </div>
                            <div className="totals__subawards">
                                Additionally, they received <span className="state-overview__total">{recipient.totalSubAmount}</span> from <span className="state-overview__total">{recipient.totalSubAwards}</span> sub-awards
                            </div>
                        </div>
                        <div className="recipient-section__viz details">
                            <h3 className="recipient-overview__heading">
                                Details
                            </h3>
                            <table className="details__table">
                                <tbody>
                                    <tr>
                                        <th>Address</th>
                                        <td>
                                            <div>{recipient.location.streetAddress}</div>
                                            <div>{recipient.location.regionalAddress}</div>
                                            <div>Congressional District: {recipient.location.congressionalDistrict}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>DUNS</th>
                                        <td>{recipient.duns}</td>
                                    </tr>
                                    <tr>
                                        <th>Parent DUNS</th>
                                        <td>{recipient.parentDuns}</td>
                                    </tr>
                                    <tr>
                                        <th>Parent Company</th>
                                        <td>{recipient.parentName}</td>
                                    </tr>
                                    <tr>
                                        <th>Recipient Type</th>
                                        <td>
                                            {recipient.businessTypes.map((type, i) =>
                                                <div key={i}>{type}</div>)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RecipientOverview.propTypes = propTypes;
