/**
 * AccountLandingContainer.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React, { useMemo, useState } from 'react';
import { flowRight, inRange } from 'lodash-es';
import { LATEST_PERIOD_PROPS } from 'propTypes';

import AccountsTableFields from 'dataMapping/accountLanding/accountsTableFields';
import withLatestFy from 'containers/account/WithLatestFy';
import AccountLandingContent from 'components/accountLanding/AccountLandingContent';
import useFetchAllAccounts from './useFetchAllAccounts';

const getColumns = (year) => {
    const columnsArray = [];
    const sortOrder = AccountsTableFields.defaultSortDirection;

    AccountsTableFields.order.forEach((col) => {
        let displayName = AccountsTableFields[col];

        if (col === 'budgetaryResources') {
            // Add default fiscal year to Budgetary Resources column header
            displayName = `${year} ${displayName}`;
        }

        const column = {
            columnName: col,
            displayName,
            defaultDirection: sortOrder[col]
        };

        columnsArray.push(column);
    });

    return columnsArray;
};

require('pages/accountLanding/accountLandingPage.scss');

const AccountLandingContainer = ({ latestPeriod }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [order, setOrder] = useState({ field: 'budgetary_resources', direction: 'desc' });
    const [searchString, setSearchString] = useState('');

    const { isLoading, isError, results, totalItems } = useFetchAllAccounts(order, pageNumber, latestPeriod.year, searchString);

    const columns = useMemo(() => {
        if (!latestPeriod?.year) return [];
        return getColumns(latestPeriod.year);
    }, [latestPeriod.year]);

    const pageSize = 50;

    const onChangePage = (page) => {
        const totalPages = Math.ceil(totalItems / pageSize);
        if (inRange(page, 1, totalPages + 1)) {
            // Change page number in the state and make a new request
            setPageNumber(page);
        }
    };

    const setAccountSearchString = (string) => {
        // Change search string in the state and make a new request
        setSearchString(string);
        setPageNumber(1);
    };

    const updateSort = (field, direction) => {
        // Change sort in the state and make a new request
        // Reset the page number to 1
        setOrder({ field, direction });
        setPageNumber(1);
    };

    return (
        <AccountLandingContent
            results={results}
            inFlight={isLoading}
            error={isError}
            columns={columns}
            order={order}
            updateSort={updateSort}
            searchString={searchString}
            setAccountSearchString={setAccountSearchString}
            onChangePage={onChangePage}
            pageNumber={pageNumber}
            totalItems={totalItems}
            pageSize={pageSize} />
    );
};

AccountLandingContainer.propTypes = { latestPeriod: LATEST_PERIOD_PROPS };
export default flowRight(withLatestFy)(AccountLandingContainer);
