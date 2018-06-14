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
            <div className="recipient-overview">
                <div className="title">
                    <h3>{recipient.name}</h3>
                </div>
                <hr className="results-divider" />
                <div className="overview-content">
                    <div className="recipient-award">
                        <h4>Recipient Award Summary</h4>
                        <hr className="results-divider" />
                        <div className="award-amounts">
                            <div className="current">
                                <div><b>Awarded Amount</b></div>
                                <div>(Trailing 12 Months)</div>
                                <h3>
                                    {recipient.totalAmount}
                                </h3>
                            </div>
                            <div className="historical">
                                <div><b>Historical Awarded Amount</b></div>
                                <div>(Since FY 2006)</div>
                                <h5>
                                    {recipient.totalSubAmount}
                                </h5>
                            </div>
                        </div>
                        <div className="award-counts">
                            <div className="current">
                                <div><b>Active Awards</b></div>
                                <div>(Trailing 12 Months)</div>
                                <h3>
                                    {recipient.totalAwards}
                                </h3>
                            </div>
                            <div className="historical">
                                <div><b>Historical Awards</b></div>
                                <div>(Since FY 2006)</div>
                                <h5>
                                    {recipient.totalSubAwards}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="recipient-details">
                        <h4>Recipient Details</h4>
                        <hr className="results-divider" />
                        <table>
                            <tbody>
                                <tr>
                                    <th>Address</th>
                                    <td>
                                        <div>{recipient.location.fullAddress}</div>
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
        );
    }
}

RecipientOverview.propTypes = propTypes;
