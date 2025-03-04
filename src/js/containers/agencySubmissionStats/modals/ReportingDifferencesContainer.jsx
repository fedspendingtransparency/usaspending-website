/**
 * ReportingDifferencesContainer.jsx
 * Created by Jonathan Hill 12/02/20
 */

import React, { useCallback, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { isCancel } from 'axios';
import { reportingDifferencesColumns } from 'dataMapping/aboutTheData/modals';
import { formatReportingDifferencesData } from 'helpers/aboutTheDataHelper';
import { fetchReportingDifferences } from 'apis/agencyReporting';

const propTypes = {
    agencyData: PropTypes.shape({
        agencyName: PropTypes.string,
        agencyCode: PropTypes.string,
        fiscalYear: PropTypes.number,
        fiscalPeriod: PropTypes.number
    })
};

const ReportingDifferencesContainer = ({ agencyData }) => {
    const [sort, setSort] = useState('tas');
    const [order, setOrder] = useState('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ error: false, message: '' });
    const [rows, setRows] = useState([]);
    const reportingDiffRequest = useRef(null);
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };

    const reportingDifferenceRequest = useCallback(async () => {
        if (error.error) setError({ error: false, message: '' });
        if (!loading) setLoading(true);
        if (reportingDiffRequest.current) reportingDiffRequest.current.cancel();
        const params = {
            page,
            limit,
            sort,
            order,
            fiscal_year: agencyData.fiscalYear,
            fiscal_period: agencyData.fiscalPeriod
        };
        try {
            reportingDiffRequest.current = fetchReportingDifferences(agencyData.agencyCode, params);
            const { data } = await reportingDiffRequest.current.promise;
            setTotal(data.page_metadata.total);
            setRows(formatReportingDifferencesData({ results: data.results }));
            setLoading(false);
            reportingDiffRequest.current = null;
        }
        catch (e) {
            if (!isCancel(e)) {
                setLoading(false);
                setError({ error: true, message: e.message });
            }
            reportingDiffRequest.current = null;
        }
    });

    // on unmount cleanup pubDatesRequest
    useEffect(() => () => {
        if (reportingDiffRequest.current) reportingDiffRequest.current.cancel();
    }, []);
    // on sort, order, limit change fetch new data or set page to 1
    useEffect(() => {
        if (page === 1) {
            reportingDifferenceRequest();
        }
        else {
            setPage(1);
        }
    }, [sort, order, limit]);
    // on page change fetch new data
    useEffect(() => {
        reportingDifferenceRequest();
    }, [page]);
    const columns = reportingDifferencesColumns.map((column, i) => ({
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

ReportingDifferencesContainer.propTypes = propTypes;
export default ReportingDifferencesContainer;
