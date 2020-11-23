/**
 * PublicationDatesContainer.jsx
 * Created by Jonathan Hill 11/20/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { isCancel } from 'axios';
import { mockAPIPublicationDates, publicationDatesColumns } from 'dataMapping/aboutTheData/modals';
import { formatPublicationDates, dateFormattedMonthDayYear } from 'helpers/aboutTheDataHelper';
import { fetchAllSubmissionDates, getSubmissionDeadlines } from 'helpers/accountHelper';
import { setSubmissionPeriods } from 'redux/actions/account/accountActions';

const propTypes = {
    fiscalYear: PropTypes.number,
    fiscalPeriod: PropTypes.number,
    agencyCode: PropTypes.string
};

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
    const [submissionDeadlines, setSubmissionDeadlines] = useState(null);
    const { submissionPeriods } = useSelector((state) => state.account);
    const subPeriodsRequest = useRef(null);
    const pubDatesRequest = useRef(null);
    const dispatch = useDispatch();
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };

    const submissionPeriodsRequest = async () => {
        if (subPeriodsRequest.current) subPeriodsRequest.current.cancel();
        try {
            subPeriodsRequest.current = fetchAllSubmissionDates();
            const { data } = await subPeriodsRequest.current.promise;
            dispatch(setSubmissionPeriods(data.available_periods));
            subPeriodsRequest.current = null;
        }
        catch (e) {
            console.log(e);
            if (!isCancel(e)) console.error(e);
            subPeriodsRequest.current = null;
        }
    };

    const publicationDatesRequest = async () => {
        if (error.error) setError({ error: false, message: '' });
        if (!loading) setLoading(true);
        if (pubDatesRequest.current) pubDatesRequest.current.cancel();
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
            pubDatesRequest.current = mockAPIPublicationDates(params);
            const { data } = await pubDatesRequest.current.promise;
            setTotal(data.page_metadata.total);
            setRows(formatPublicationDates(data.results));
            setLoading(false);
            pubDatesRequest.current = null;
        }
        catch (e) {
            console.error(e);
            if (!isCancel(e)) {
                setLoading(false);
                setError({ error: true, message: e.message });
            }
            pubDatesRequest.current = null;
        }
    };
    // get submission periods if we do not have them
    useEffect(() => {
        if (!submissionPeriods.size) {
            submissionPeriodsRequest();
        }
        else {
            setSubmissionDeadlines(getSubmissionDeadlines(fiscalYear, fiscalPeriod, submissionPeriods.toJS()));
        }
    }, [submissionPeriods]);
    // on mount fetch data, and unmount cleanup pubDatesRequest
    useEffect(() => {
        publicationDatesRequest();
        return () => {
            if (pubDatesRequest.current) pubDatesRequest.current.cancel();
        };
    }, []);
    // on page, sort, order, or limit change fetch new data
    useEffect(() => {
        publicationDatesRequest();
    }, [sort, order, page, limit]);
    // do not show deadlines in column headers if we do not have the data
    const columns = publicationDatesColumns.map((column) => ({
        displayName: (
            <div className="publication-dates__column-header-container">
                <div className="publication-dates__column-header-title">
                    {column.displayName}
                </div>
                <div className="publication-dates__column-header-sub-title">
                    <i>{`Deadline: ${column.title === 'publication_date' ?
                        dateFormattedMonthDayYear(submissionDeadlines?.submissionDueDate) || '--' : dateFormattedMonthDayYear(submissionDeadlines?.certificationDueDate) || '--'}`}
                    </i>
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

PublicationDatesContainer.propTypes = propTypes;
export default PublicationDatesContainer;
