/**
 * MissingAccountBalanceContainer.jsx
 * Created by Jonathan Hill 11/21/20
 */

import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { isCancel } from 'axios';
import { missingAccountBalanceColumns } from 'dataMapping/aboutTheData/modals';
import { fetchMissingAccountBalances } from 'apis/agencyReporting';
import { formatMissingAccountBalancesData } from 'helpers/aboutTheDataHelper';

const propTypes = {
    agencyData: PropTypes.shape({
        gtasObligationTotal: PropTypes.number,
        agencyCode: PropTypes.string,
        fiscalYear: PropTypes.number,
        fiscalPeriod: PropTypes.number
    })
};

const MissingAccountBalanceContainer = ({
    agencyData
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

    const missingAccountBalancesRequest = useCallback(async () => {
        if (error.error) setError({ error: false, message: '' });
        if (!loading) setLoading(true);
        if (missingAccBalancesRequest.current) missingAccBalancesRequest.current.cancel();
        const params = {
            page,
            limit,
            sort,
            order,
            fiscal_year: agencyData.fiscalYear,
            fiscal_period: agencyData.fiscalPeriod
        };
        try {
            missingAccBalancesRequest.current = fetchMissingAccountBalances(agencyData.agencyCode, params);
            const { data } = await missingAccBalancesRequest.current.promise;
            setTotal(data.page_metadata.total);
            setRows(formatMissingAccountBalancesData({ results: data.results, gtasObligationTotal: agencyData.gtasObligationTotal }));
            setLoading(false);
            missingAccBalancesRequest.current = null;
        }
        catch (e) {
            if (!isCancel(e)) {
                setLoading(false);
                setError({ error: true, message: e.message });
                console.error(e);
            }
            missingAccBalancesRequest.current = null;
        }
    });

    // on unmount cleanup pubDatesRequest
    useEffect(() => () => {
        if (missingAccBalancesRequest.current) missingAccBalancesRequest.current.cancel();
    }, []);
    // on sort, order, limit change fetch new data or set page to 1
    useEffect(() => {
        if (page === 1) {
            missingAccountBalancesRequest();
        }
        else {
            setPage(1);
        }
    }, [sort, order, limit]);
    // on page change fetch new data
    useEffect(() => {
        missingAccountBalancesRequest();
    }, [page]);
    // do not show deadlines in column headers if we do not have the data
    const columns = missingAccountBalanceColumns.map((column, i) => ({
        displayName: column.displayName,
        title: column.title,
        right: i !== 0
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
