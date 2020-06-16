/**
 * RecipientOverview.jsx
 * Created by Lizzie Salita 8/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FaceValueOfLoans from '../sharedComponents/FaceValueOfLoans';
import { recipientOverviewLoanInfo } from '../award/shared/InfoTooltipContent';
import RecipientMultiParentCollapse from './RecipientMultiParentCollapse';

const propTypes = {
    recipient: PropTypes.object,
    showChildRecipientModal: PropTypes.func,
    showAlternateNamesRecipientModal: PropTypes.func
};

const RecipientOverview = (props) => {
    const recipient = props.recipient.overview;
    let label = (
        <div className="recipient-overview__label">
                Recipient
        </div>
    );
    let viewChildren = null;
    let parent = null;
    if (recipient.level === 'C') {
        // This is a child recipient
        label = (
            <div className="recipient-overview__label recipient-overview__label_child">
                    Child Recipient
            </div>
        );
        parent = (<RecipientMultiParentCollapse
            parents={recipient.parents} />);
    }
    else if (recipient.level === 'P') {
        // This is a parent recipient
        label = (
            <span
                className="recipient-overview__label recipient-overview__label_parent">
                    Parent Recipient
            </span>
        );
        viewChildren = (
            <button
                className="recipient-overview__children-button"
                onClick={props.showChildRecipientModal}>
                    View child recipients <FontAwesomeIcon icon="caret-right" />
            </button>
        );
    }
    const numberOfAlternateNames = recipient.alternateNames.length;
    const pluralizeAltNamesLabel = numberOfAlternateNames > 1 ? "names" : "name";
    const viewAlternateNames = numberOfAlternateNames > 0
        ? (
            <button
                className="recipient-overview__alternate-names-button"
                onClick={props.showAlternateNamesRecipientModal}>
                {`Also known by ${numberOfAlternateNames} other ${pluralizeAltNamesLabel}`} <FontAwesomeIcon icon="caret-right" />
            </button>
        )
        : null;

        // Format the location data
    let address = (
        <td>Address not provided in source system</td>
    );
    if (recipient.location.streetAddress && recipient.location.regionalAddress && recipient.location.fullCongressionalDistrict) {
        address = (
            <td>
                <div>{recipient.location.streetAddress}</div>
                <div>{recipient.location.regionalAddress}</div>
                <div>{recipient.location.fullCongressionalDistrict}</div>
            </td>
        );
    }

    // Format business types
    let businessTypes = (
        <td>
            Not provided in source system
        </td>
    );
    if (recipient.businessTypes.length > 0) {
        businessTypes = (
            <td>
                {recipient.businessTypes.map((type, i) =>
                    <div key={i}>{type}</div>)}
            </td>
        );
    }

    return (
        <div
            id="recipient-overview"
            className="recipient-section recipient-overview">
            <h2 className="recipient-overview__title">
                {recipient.name}
                {viewAlternateNames}
            </h2>
            <hr className="results-divider" />
            <div className="recipient-overview__content">
                {parent}
                <div className="recipient-overview__children">
                    {label}
                    {viewChildren}
                </div>
                <div className="recipient-section__row">
                    <div className="recipient-section__viz totals-container">
                        <div className="recipient-section__viz totals">
                            <h3 className="recipient-overview__heading">
                            Total Transactions
                            </h3>
                            <div className="totals__amount">
                                {recipient.totalAmount}
                            </div>
                            <div className="totals__awards">
                            from <span className="state-overview__total">{recipient.totalTransactions}</span> transactions
                            </div>
                        </div>
                        <div className="recipient-section__viz loan">
                            <FaceValueOfLoans amount={recipient.totalLoanFaceValueAmount} transactions={recipient.totalLoanTransactions} heading="Face Value of Loans" headingClass="recipient-overview__heading" tooltipIcon="info" tooltipClasses="recipient-section__viz-loan__tt" tooltipComponent={recipientOverviewLoanInfo} tooltipPosition="right" />
                        </div>
                    </div>

                    <div className="recipient-section__viz details">
                        <h3 className="recipient-overview__heading">
                            Details
                        </h3>
                        <table className="details__table">
                            <tbody>
                                <tr>
                                    <th>DUNS</th>
                                    <td>{recipient.duns}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    {address}
                                </tr>
                                <tr>
                                    <th>Business Types</th>
                                    {businessTypes}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

RecipientOverview.propTypes = propTypes;
export default RecipientOverview;

