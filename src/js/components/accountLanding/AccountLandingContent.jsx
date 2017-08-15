/**
 * AccountLandingContent.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import AccountLandingSearchBar from './AccountLandingSearchBar';
import AccountLandingResultsSection from './AccountLandingResultsSection';
import AccountLandingPagination from './AccountLandingPagination';

const propTypes = {
    resultsText: PropTypes.string,
    results: PropTypes.array,
    accountSearchString: PropTypes.string,
    inFlight: PropTypes.bool,
    columns: PropTypes.array,
    setAccountSearchString: PropTypes.func,
    onChangePage: PropTypes.func,
    pager: PropTypes.object
};

export default class AccountLandingContent extends React.Component {
    render() {
        return (
            <div className="landing-page-content">
                <div className="landing-page-overview">
                    <h3>Find a Federal Account Profile.</h3>
                    <h6>Explore spending in greater detail in our federal account profiles.</h6>
                    <p>
                        There are over 2,000 unique federal accounts used to track the spending of
                        federal agencies. These help to understand how agencies receive and spend
                        funding granted by congress to carry out their programs, projects, or activities.
                    </p>
                </div>
                <div className="landing-page-section">
                    <AccountLandingSearchBar
                        setAccountSearchString={this.props.setAccountSearchString} />
                </div>
                <div className="landing-page-section results-count">
                    {this.props.resultsText}
                    <AccountLandingPagination
                        onChangePage={this.props.onChangePage}
                        pager={this.props.pager} />
                </div>
                <div className="landing-page-section">
                    <AccountLandingResultsSection
                        columns={this.props.columns}
                        results={this.props.results}
                        inFlight={this.props.inFlight}
                        accountSearchString={this.props.accountSearchString} />
                    <AccountLandingPagination
                        onChangePage={this.props.onChangePage}
                        pager={this.props.pager} />
                </div>
            </div>
        );
    }
}

AccountLandingContent.propTypes = propTypes;
