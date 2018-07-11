/**
 * RecipientLandingContent.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/sharedComponents/Pagination';
import RecipientLandingResultsSection from './RecipientLandingResultsSection';
import RecipientLabels from './RecipientLabels';
import RecipientLandingSearchBar from './RecipientLandingSearchBar';

const propTypes = {
    results: PropTypes.array,
    accountSearchString: PropTypes.string,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    setRecipientSearchString: PropTypes.func,
    onChangePage: PropTypes.func,
    pageNumber: PropTypes.number,
    totalItems: PropTypes.number,
    pageSize: PropTypes.number,
    order: PropTypes.object,
    setSort: PropTypes.func
};

export default class RecipientLandingContent extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <div className="landing-page__overview">
                    <h2 className="landing-page__title">
                        Recipient Profiles
                    </h2>
                    <div className="landing-page__description">
                    Recipients are any entity that has received federal money in the form of contracts, grants, loans, or other financial assistance.  Our Recipient Profiles offer insights into a specific recipient, including award trends over time and top 5 rankings from a variety of categories.
                    </div>
                </div>
                <RecipientLandingSearchBar
                    setRecipientSearchString={this.props.setRecipientSearchString} />
                <RecipientLabels />
                <Pagination
                    onChangePage={this.props.onChangePage}
                    pageNumber={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
                <RecipientLandingResultsSection
                    results={this.props.results}
                    inFlight={this.props.inFlight}
                    error={this.props.error}
                    accountSearchString={this.props.accountSearchString}
                    order={this.props.order}
                    setSort={this.props.setSort} />
                <Pagination
                    onChangePage={this.props.onChangePage}
                    pageNumber={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
            </div>
        );
    }
}

RecipientLandingContent.propTypes = propTypes;
