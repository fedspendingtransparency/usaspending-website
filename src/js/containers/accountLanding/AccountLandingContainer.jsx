/**
 * AccountLandingContainer.jsx
 * Created by Lizzie Salita 8/4/17
 */

import React, { useState, useEffect, useRef } from 'react';

import { isCancel } from 'axios';
import { flowRight, inRange } from 'lodash-es';

import AccountsTableFields from 'dataMapping/accountLanding/accountsTableFields';
import withLatestFy from 'containers/account/WithLatestFy';
import AccountLandingContent from 'components/accountLanding/AccountLandingContent';
import BaseFederalAccountLandingRow from 'models/v1/accountLanding/BaseFederalAccountLandingRow';
import { LATEST_PERIOD_PROPS } from 'propTypes';
import { fetchAllAccounts } from '../../helpers/accountLandingHelper';

require('pages/accountLanding/accountLandingPage.scss');

const AccountLandingContainer = ({ latestPeriod }) => {
    const [pageNumber, setPageNumber] = useState(1);
    const [order, setOrder] = useState({ field: 'budgetary_resources', direction: 'desc' });
    const [columns, setColumns] = useState([]);
    const [inFlight, setInFlight] = useState(false);
    const [error, setError] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [results, setResults] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize] = useState(50);

    const accountsRequest = useRef(null);

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

    const showColumns = () => {
        const { year: fy } = latestPeriod;
        const columnsArray = [];
        const sortOrder = AccountsTableFields.defaultSortDirection;

        AccountsTableFields.order.forEach((col) => {
            let displayName = AccountsTableFields[col];
            if (col === 'budgetaryResources') {
                // Add default fiscal year to Budgetary Resources column header
                displayName = `${fy} ${displayName}`;
            }
            const column = {
                columnName: col,
                displayName,
                defaultDirection: sortOrder[col]
            };
            columnsArray.push(column);
        });

        setColumns(columnsArray);
    };

    useEffect(() => {
        if (latestPeriod.year) {
            showColumns();
        }

        return () => {
            if (accountsRequest.current) accountsRequest.current.cancel();
        };
    }, [latestPeriod.year]);

    const parseAccounts = (data) => {
        const accounts = [];

        data.results.forEach((item) => {
            const account = Object.create(BaseFederalAccountLandingRow);
            account.parse(item);
            accounts.push(account);
        });

        setTotalItems(data.count);
        setResults(accounts);
    };

    const fetchAccounts = () => {
        if (accountsRequest.current) {
            // a request is in-flight, cancel it
            accountsRequest.current.cancel();
        }

        setInFlight(true);
        setError(false);

        // generate the params
        const pageSize = 50;
        const params = {
            sort: order,
            page: pageNumber,
            limit: pageSize,
            filters: {
                fy: `${latestPeriod.year}`
            }
        };

        if (searchString) {
            params.keyword = searchString;
        }

        accountsRequest.current = fetchAllAccounts(params);

        accountsRequest.current.promise
            .then((res) => {
                setInFlight(false);

                parseAccounts(res.data);
            })
            .catch((err) => {
                accountsRequest.current = null;
                if (!isCancel(err)) {
                    setInFlight(false);
                    setError(true);
                    console.log(err);
                }
            });
    };

    useEffect(() => {
        fetchAccounts();
    }, [pageNumber, searchString, order, columns]);

    return (
        <AccountLandingContent
            results={results}
            inFlight={inFlight}
            error={error}
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
