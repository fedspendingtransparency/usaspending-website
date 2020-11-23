/**
 * MissingAccountBalanceContainer.jsx
 * Created by Jonathan Hill 11/21/20
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { isCancel } from 'axios';
import { mockAPIMissingAccountBalances, missingAccountBalanceColumns } from 'dataMapping/aboutTheData/modals';
import { formatMissingAccountBalancesData } from 'helpers/aboutTheDataHelper';

const propTypes = {
    agencyCode: PropTypes.string,
    fiscalYear: PropTypes.number,
    fiscalPeriod: PropTypes.number,
    totalObligationsNotInGTAS: PropTypes.number
};

const MissingAccountBalanceContainer = ({
    agencyCode,
    fiscalYear,
    fiscalPeriod,
    totalObligationsNotInGTAS
}) => {
    const [sort, setSort] = useState('amount');
    const [order, setOrder] = useState('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ error: false, message: '' });
    const [rows, setRows] = useState([]);
    const missingAccBalancesRequest = useRef(null);
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };

    const missingAccountBalancesRequest = async () => {
        if (error.error) setError({ error: false, message: '' });
        if (!loading) setLoading(true);
        if (missingAccBalancesRequest.current) missingAccBalancesRequest.current.cancel();
        const params = {
            page,
            limit,
            sort,
            order,
            agencyCode,
            fiscalYear,
            fiscalPeriod
        };
        try {
            missingAccBalancesRequest.current = mockAPIMissingAccountBalances(params);
            const { data } = await missingAccBalancesRequest.current.promise;
            setTotal(data.page_metadata.total);
            setRows(formatMissingAccountBalancesData({ results: data.results, totalObligationsNotInGTAS }));
            setLoading(false);
            missingAccBalancesRequest.current = null;
        }
        catch (e) {
            console.error(e);
            if (!isCancel(e)) {
                setLoading(false);
                setError({ error: true, message: e.message });
            }
            missingAccBalancesRequest.current = null;
        }
    };

    // on mount fetch data, and unmount cleanup pubDatesRequest
    useEffect(() => {
        missingAccountBalancesRequest();
        return () => {
            if (missingAccBalancesRequest.current) missingAccBalancesRequest.current.cancel();
        };
    }, []);
    // on page, sort, order, or limit change fetch new data
    useEffect(() => {
        missingAccountBalancesRequest();
    }, [sort, order, page, limit]);
    // do not show deadlines in column headers if we do not have the data
    const columns = missingAccountBalanceColumns.map((column) => ({
        displayName: (
            <div className="missing-account-balances__column-header-container">
                <div className="missing-account-balances__column-header-title">
                    {column.displayName}
                </div>
            </div>
        ),
        title: column.title
    }));

    return (
        <>
            <Table
                loading={loading}
                error={error.error}
                message={error.message}
                rows={rows}
                columns={columns}
                currentSort={{ field: sort, direction: order }}
                updateSort={updateSort} />
            <Pagination
                currentPage={page}
                changePage={setPage}
                changeLimit={setLimit}
                limitSelector
                resultsText
                pageSize={limit}
                totalItems={total} />
        </>
    );
};

MissingAccountBalanceContainer.propTypes = propTypes;
export default MissingAccountBalanceContainer;
