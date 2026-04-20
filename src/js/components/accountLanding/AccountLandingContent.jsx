/**
 * AccountLandingContent.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FlexGridCol, FlexGridRow, Pagination } from 'data-transparency-ui';

import AccountLandingSearchBar from './AccountLandingSearchBar';
import AccountLandingResultsSection from './AccountLandingResultsSection';
import H2PageHeader from '../sharedComponents/header/H2PageHeader';

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

const AccountLandingContent = ({
    results,
    searchString,
    inFlight,
    error,
    columns,
    setAccountSearchString,
    onChangePage,
    pageNumber,
    totalItems,
    pageSize,
    order,
    updateSort
}) => {
    // eslint-disable-next-line max-len
    const subtitle = "The government has more than 2,000 unique Federal Accounts, which are similar to bank accounts. Use our Federal Account Profiles to get a better understanding of how agencies receive and spend congressional funding to carry out their programs, projects, and activities.";

    return (
        <FlexGridRow className="content__row landing-page">
            <H2PageHeader title="Find a Federal Account Profile." subtitle={subtitle} />
            <FlexGridCol width={12} className="content__col">
                <AccountLandingSearchBar
                    setAccountSearchString={setAccountSearchString} />
                <Pagination
                    resultsText
                    changePage={onChangePage}
                    currentPage={pageNumber}
                    totalItems={totalItems}
                    pageSize={pageSize} />
                <AccountLandingResultsSection
                    columns={columns}
                    results={results}
                    inFlight={inFlight}
                    error={error}
                    searchString={searchString}
                    order={order}
                    updateSort={updateSort} />
                <Pagination
                    changePage={onChangePage}
                    currentPage={pageNumber}
                    totalItems={totalItems}
                    pageSize={pageSize} />
            </FlexGridCol>
        </FlexGridRow>
    );
};

AccountLandingContent.propTypes = propTypes;
export default AccountLandingContent;
