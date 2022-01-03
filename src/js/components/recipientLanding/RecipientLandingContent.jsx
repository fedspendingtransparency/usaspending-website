/**
 * RecipientLandingContent.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'data-transparency-ui';

import RecipientLandingResultsSection from './RecipientLandingResultsSection';
import RecipientLabels from './RecipientLabels';
import RecipientLandingTabs from './RecipientLandingTabs';
import RecipientLandingSearchBar from './RecipientLandingSearchBar';

const propTypes = {
    results: PropTypes.array,
    searchString: PropTypes.string,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    setRecipientSearchString: PropTypes.func,
    onChangePage: PropTypes.func,
    pageNumber: PropTypes.number,
    totalItems: PropTypes.number,
    pageSize: PropTypes.number,
    order: PropTypes.object,
    setSort: PropTypes.func,
    setTab: PropTypes.func
};

export default class RecipientLandingContent extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <div className="landing-page__overview">
                    <h2 className="landing-page__title">
                        Find a Recipient Profile.
                    </h2>
                    <div className="landing-page__description">
                        Recipients are any entity that has received federal money in the form of contracts, grants, loans, or other financial assistance.  Our Recipient Profiles offer insights into a specific recipient, including award trends over time and top 5 rankings from a variety of categories.
                    </div>
                </div>
                <RecipientLandingSearchBar
                    setRecipientSearchString={this.props.setRecipientSearchString} />
                <div className="landing-page__info">
                    <RecipientLabels />
                    <Pagination
                        resultsText
                        changePage={this.props.onChangePage}
                        currentPage={this.props.pageNumber}
                        totalItems={this.props.totalItems}
                        pageSize={this.props.pageSize} />
                </div>
                <RecipientLandingTabs
                    setTab={this.props.setTab} />
                <RecipientLandingResultsSection
                    results={this.props.results}
                    inFlight={this.props.inFlight}
                    error={this.props.error}
                    searchString={this.props.searchString}
                    order={this.props.order}
                    setSort={this.props.setSort} />
                <Pagination
                    resultsText
                    changePage={this.props.onChangePage}
                    currentPage={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
                <p className="landing-page__disclaimer">
                    <span className="landing-page__note">Note:</span> Profiles are not included for the following recipient names because they would represent aggregations of many individuals instead of specific legal entities:  <br /><span className="landing-page__entities">Multiple Recipients, Multiple Foreign Recipients, Miscellaneous Foreign Awardees, Private Individual, Individual Recipient, and Redacted Due to PII</span>.
                </p>
            </div>
        );
    }
}

RecipientLandingContent.propTypes = propTypes;
