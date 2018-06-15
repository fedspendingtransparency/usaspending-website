/**
 * RecipientOverview.jsx
 * Created by Lizzie Salita 8/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    recipient: PropTypes.object
};

export default class RecipientOverview extends React.Component {
    render() {
        const recipient = this.props.recipient;
        return (
            <div
                id="recipient-overview"
                className="recipient-section recipient-overview">
                <h2 className="recipient-overview__title">
                    {recipient.name}
                </h2>
                <hr className="results-divider" />
                <div className="recipient-overview__content">
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
