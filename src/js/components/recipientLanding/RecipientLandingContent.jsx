/**
 * RecipientLandingContent.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridCol, FlexGridRow, Pagination } from 'data-transparency-ui';

import RecipientLandingResultsSection from './RecipientLandingResultsSection';
import RecipientLabels from './RecipientLabels';
import RecipientLandingTabs from './RecipientLandingTabs';
import RecipientLandingSearchBar from './RecipientLandingSearchBar';
import H2PageHeader from '../sharedComponents/header/H2PageHeader';

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

const RecipientLandingContent = ({
    results,
    searchString,
    inFlight,
    error,
    setRecipientSearchString,
    onChangePage,
    pageNumber,
    totalItems,
    pageSize,
    order,
    setSort,
    setTab
}) => {
    // eslint-disable-next-line max-len
    const subtitle = "Recipients are any entity that has received federal money in the form of contracts, grants, loans, or other financial assistance.  Our Recipient Profiles offer insights into a specific recipient, including award trends over time and top 5 rankings from a variety of categories.";

    return (
        <FlexGridRow className="content__row landing-page">
            <FlexGridCol className="content__col" width="fill">
                <H2PageHeader title="Find a Recipient Profile." subtitle={subtitle} />
                <RecipientLandingSearchBar
                    setRecipientSearchString={setRecipientSearchString} />
                <div className="landing-page__info">
                    <RecipientLabels />
                    <Pagination
                        resultsText
                        changePage={onChangePage}
                        currentPage={pageNumber}
                        totalItems={totalItems}
                        pageSize={pageSize} />
                </div>
                <RecipientLandingTabs
                    setTab={setTab} />
                <RecipientLandingResultsSection
                    results={results}
                    inFlight={inFlight}
                    error={error}
                    searchString={searchString}
                    order={order}
                    setSort={setSort} />
                <Pagination
                    resultsText
                    changePage={onChangePage}
                    currentPage={pageNumber}
                    totalItems={totalItems}
                    pageSize={pageSize} />
                <p className="landing-page__disclaimer">
                    <span className="landing-page__note">Note: </span>
                    Profiles are not included for the following recipient names because they would represent aggregations of many individuals instead of specific legal entities:
                    <br />
                    <span className="landing-page__entities">
                    Multiple Recipients, Multiple Foreign Recipients, Miscellaneous Foreign Awardees, Private Individual, Individual Recipient, and Redacted Due to PII
                    </span>.
                </p>
            </FlexGridCol>
        </FlexGridRow>
    );
};

RecipientLandingContent.propTypes = propTypes;
export default RecipientLandingContent;
