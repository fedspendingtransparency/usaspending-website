/**
 * PublicationDatesContainer.jsx
 * Created by Jonathan Hill 11/20/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { isCancel } from 'axios';
import { publicationDatesColumns } from 'dataMapping/aboutTheData/modals';
import { formatPublicationDates, dateFormattedMonthDayYear, fetchPublishDates } from 'helpers/aboutTheDataHelper';
import { fetchAllSubmissionDates, getSubmissionDeadlines } from 'helpers/accountHelper';
import { setSubmissionPeriods } from 'redux/actions/account/accountActions';

const propTypes = {
    fiscalYear: PropTypes.string,
    fiscalPeriod: PropTypes.string,
    agencyData: PropTypes.object
};

const PublicationDatesContainer = ({
    fiscalYear,
    fiscalPeriod,
    agencyData
}) => {
    const [sort, setSort] = useState('publication_date');
    const [order, setOrder] = useState('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ error: false, message: '' });
    const [rawData, setRawData] = useState([]);
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

    const createMillisecondDates = (data) => data.map((datesObj) => {
        console.log(' DAtes OBJ : ', datesObj);
        const publicationDate = !datesObj.publication_date ? new Date(0) : new Date(datesObj.publication_date);
        const certificationDate = !datesObj.certification_date ? new Date(0) : new Date(datesObj.certification_date);
        return { publication_date: publicationDate.getMilliseconds(), certification_date: certificationDate.getMilliseconds() };
    });

    const sortFunction = (a, b) => {
        if (order === 'desc') return b[sort] - a[sort];
        return a[sort] - b[sort];
    };

    const fakeData = () => {
        const data = [{ publication_date: 1578286800000, certification_date: 1579150800000 }];
        for (let i = 2; i <= 95; i++) {
            data.push({
                publication_date: data[0].publication_date - (i * 86400000),
                certification_date: data[0].certification_date - (i * 86400000)
            });
        }
        return data;
    };

    const pageAndSortData = () => (
        // if (!rawData.length) return [];
        // return rawData.sort(sortFunction).slice((page - 1) * limit, page * limit);
        fakeData().sort(sortFunction).slice((page - 1) * limit, page * limit)
    );
    console.log(' ff', fakeData());
    const publicationDatesRequest = async () => {
        if (error.error) setError({ error: false, message: '' });
        if (!loading) setLoading(true);
        if (pubDatesRequest.current) pubDatesRequest.current.cancel();
        try {
            // pubDatesRequest.current = fetchPublishDates(agencyData.agencyCode, fiscalYear, fiscalPeriod, { page: 1, limit: 100 });
            pubDatesRequest.current = fetchPublishDates('020', fiscalYear, fiscalPeriod, { page: 1, limit: 100 });
            const { data } = await pubDatesRequest.current.promise;
            // setTotal(data.page_metadata.total);
            setTotal(fakeData().length);
            setRawData(createMillisecondDates(data.results));
            console.log('dlskfj', pageAndSortData());
            setRows(formatPublicationDates(pageAndSortData()));
            // setRows(formatPublicationDates(data.results));
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
    // on mount fetch all data, unmount cleanup pubDatesRequest
    useEffect(() => {
        publicationDatesRequest();
        return () => {
            if (pubDatesRequest.current) pubDatesRequest.current.cancel();
        };
    }, []);
    // on sort, order, limit change fetch new data or reset page to 1
    useEffect(() => {
        if (page !== 1) {
            setPage(1);
        }
        else {
            setRows(formatPublicationDates(pageAndSortData()));
        }
    }, [sort, order, limit]);
    // on page change fetch new data
    useEffect(() => {
        setRows(formatPublicationDates(pageAndSortData()));
    }, [page]);

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
