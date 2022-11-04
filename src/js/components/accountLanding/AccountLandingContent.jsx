/**
 * AccountLandingContent.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'data-transparency-ui';

import AccountLandingSearchBar from './AccountLandingSearchBar';
import AccountLandingResultsSection from './AccountLandingResultsSection';

const propTypes = {
    results: PropTypes.array,
    searchString: PropTypes.string,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    columns: PropTypes.array,
    setAccountSearchString: PropTypes.func,
    onChangePage: PropTypes.func,
    pageNumber: PropTypes.number,
    totalItems: PropTypes.number,
    pageSize: PropTypes.number,
    order: PropTypes.object,
    updateSort: PropTypes.func
};

export default class AccountLandingContent extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <div className="landing-page__overview">
                    <h2 className="landing-page__title">
                        Find a Federal Account Profile.
                    </h2>
                    <div className="landing-page__description">
                        The government has more than 2,000 unique Federal Accounts, which are similar to bank accounts. Use our Federal Account Profiles to get a better understanding of how agencies receive and spend congressional funding to carry out their programs, projects, and activities.
                    </div>
                </div>
                <AccountLandingSearchBar
                    setAccountSearchString={this.props.setAccountSearchString} />
                <Pagination
                    resultsText
                    changePage={this.props.onChangePage}
                    currentPage={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
                <AccountLandingResultsSection
                    columns={this.props.columns}
                    results={this.props.results}
                    inFlight={this.props.inFlight}
                    error={this.props.error}
                    searchString={this.props.searchString}
                    order={this.props.order}
                    updateSort={this.props.updateSort} />
                <Pagination
                    changePage={this.props.onChangePage}
                    currentPage={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
            </div>
        );
    }
}

AccountLandingContent.propTypes = propTypes;
