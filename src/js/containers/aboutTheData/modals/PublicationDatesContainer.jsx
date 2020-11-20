/**
 * PublicationDatesContainer.jsx
 * Created by Jonathan Hill 11/20/20
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { isCancel } from 'axios';
import { mockAPIPublicationDates } from 'dataMapping/aboutTheData/modals';
import { formatPublicationDates } from 'helpers/aboutTheDataHelper';

const propTypes = {
    fiscalYear: PropTypes.number,
    fiscalPeriod: PropTypes.number,
    agencyCode: PropTypes.string
};

const columns = [
    { displayName: 'Publication Date', title: 'publication_date' },
    { displayName: 'Certification Date', title: 'certification_date' }
];

const PublicationDatesContainer = ({
    fiscalYear,
    fiscalPeriod,
    agencyCode
}) => {
    const [sort, setSort] = useState('publication_date');
    const [order, setOrder] = useState('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ error: false, message: '' });
    const [rows, setRows] = useState([]);
    const request = useRef(null);
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };

    const publicationDatesRequest = async () => {
        if (error.error) setError({ error: false, message: '' });
        if (!loading) setLoading(true);
        if (request.current) request.current.cancel();
        const params = {
            page,
            limit,
            sort,
            order
        };
        try {
            request.current = mockAPIPublicationDates(params);
            const { data } = await request.current.promise;
            setTotal(data.page_metadata.total);
            setRows(formatPublicationDates(data.results));
            setLoading(false);
        }
        catch (e) {
            console.error(e);
            if (!isCancel(e)) {
                setLoading(false);
                setError({ error: true, message: e.message });
            }
        }
    };
    // on mount fetch data, and unmount cleanup request
    useEffect(() => {
        publicationDatesRequest();
        return () => {
            if (request.current) request.current.cancel();
        };
    }, []);
    // on page, sort, order, or limit change fetch new data
    useEffect(() => {
        publicationDatesRequest();
    }, [sort, order, page, limit]);

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

PublicationDatesContainer.propTypes = propTypes;
export default PublicationDatesContainer;
