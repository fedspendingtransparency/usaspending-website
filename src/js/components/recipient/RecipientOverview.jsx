/**
 * RecipientOverview.jsx
 * Created by Lizzie Salita 8/24/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Set } from 'immutable';
import { isCancel } from 'axios';
import { TooltipWrapper, SectionHeader } from 'data-transparency-ui';
import { initialState as defaultFilters } from 'redux/reducers/search/searchFiltersReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { recipientOverviewLoanInfo } from 'components/recipient/InfoTooltipContent';
import { idList } from 'dataMapping/shared/recipientIdentifiers';

import { generateUrlHash } from "../../helpers/searchHelper";
import FaceValueOfLoans from '../sharedComponents/FaceValueOfLoans';
import RecipientMultiParentCollapse from './RecipientMultiParentCollapse';
import { REQUEST_VERSION } from "../../GlobalConstants";
import FeatureFlag from "../sharedComponents/FeatureFlag";
import { CondensedCDTooltip } from '../../components/award/shared/InfoTooltipContent';

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
            <span className="recipient-overview__label recipient-overview__label_parent">
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

    let congressionalDistrict = (<td>Not provided</td>);
    if (recipient.location.streetAddress && recipient.location.regionalAddress && recipient.location.fullCongressionalDistrict) {
        address = (
            <td>
                <div>{recipient.location.streetAddress}</div>
                <div>{recipient.location.regionalAddress}</div>
            </td>
        );
        congressionalDistrict = (
            <td>
                <div>{recipient.location.congressionalDistrict}</div>
            </td>
        );
    }
    else if (recipient.location.streetAddress && recipient.location.regionalAddress) {
        address = (
            <td>
                <div>{recipient.location.streetAddress}</div>
                <div>{recipient.location.regionalAddress}</div>
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

    const getSelectedHash = (uei) => {
        let filters = null;
        if (recipient.level === 'P') {
            filters = {
                filters: {
                    ...defaultFilters,
                    keyword: { [uei]: uei }
                },
                version: REQUEST_VERSION
            };
        }
        else {
            const filter = new Set().add(uei);
            filters = {
                filters: {
                    ...defaultFilters,
                    selectedRecipients: filter
                },
                version: REQUEST_VERSION
            };
        }
        let tempHash = generateUrlHash(filters);
        tempHash.promise
            .then((results) => {
                const hashData = results.data;
                window.open(`/search/?hash=${hashData.hash}`, '_blank');
                // operation has resolved
                tempHash = null;
            })
            .catch((error) => {
                console.log(error);
                if (isCancel(error)) {
                    // Got cancelled
                }
                else if (error.response) {
                    // Errored out but got response, toggle noAward flag
                    this.hash = null;
                }
                else {
                    // Request failed
                    tempHash = null;
                    console.log(error);
                }
            });
    };
    const handleGoToAdvancedSearch = (e) => {
        e.preventDefault();
        getSelectedHash(recipient.uei);
    };
    return (
        <div
            id="recipient-overview"
            className="recipient-section recipient-overview">
            <h2 className="recipient-overview__title">
                {recipient.name}
                {viewAlternateNames}
            </h2>
            <SectionHeader
                icon={<FontAwesomeIcon icon="building" size="2x" />}
                title="Overview"
                titleTooltip={{ component: false }}
                descTooltip={{ component: false }} />
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
                                Total Awarded Amount
                            </h3>
                            <div className="totals__amount">
                                {recipient.totalAmount}
                            </div>
                            <div className="totals__awards">
                                from <span className="state-overview__total">{recipient.totalTransactions}</span> transactions
                            </div>
                            {(recipient.uei !== "" && recipient.uei !== null && recipient.uei !== undefined) &&
                                <Link
                                    className="recipient-section__award-button"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    to="/search"
                                    onClick={handleGoToAdvancedSearch}>
                                    View awards to this recipient
                                </Link>
                            }
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
                                    <th>Recipient Identifier</th>
                                    <td>{idList(recipient.duns, recipient.uei).map((i) => <>{i}<br /></>)}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    {address}
                                </tr>
                                <tr>
                                    <th className="details__table-cd-row">
                                        <div className="details__table-cd-text">
                                            Congressional District
                                        </div>
                                        <FeatureFlag>
                                            <TooltipWrapper
                                                className="congressional-district__tt"
                                                icon="info"
                                                tooltipPosition="bottom"
                                                styles={{
                                                    position: 'relative'
                                                }}
                                                tooltipComponent={<CondensedCDTooltip title="Congressional District" />} />
                                        </FeatureFlag>
                                    </th>
                                    {congressionalDistrict}
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
