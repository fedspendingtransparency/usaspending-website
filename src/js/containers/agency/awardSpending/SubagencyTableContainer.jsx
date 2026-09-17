/**
 * SubagencyTableContainer.jsx
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Pagination } from 'data-transparency-ui';

import { subagencyColumns, subagencyFields } from 'dataMapping/agency/tableColumns';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import {
    setSubagencyTotals,
    resetSubagencyTotals
} from 'redux/actions/agency/agencyActions';
import { fetchSubagencySpendingList } from 'apis/agency';
import { parseRows } from 'helpers/agency/AwardSpendingSubagencyHelper';

const propTypes = {
    fy: PropTypes.string,
    type: PropTypes.string.isRequired,
    prevType: PropTypes.string,
    subHeading: PropTypes.string
};

const SubagencyTableContainer = ({
    fy,
    type,
    prevType,
    subHeading
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState('totalObligations');
    const [order, setOrder] = useState('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const request = useRef(null);
    const dispatch = useDispatch();
    const { toptierCode } = useSelector((state) => state.agency.overview);

    useEffect(() => {
        if (request.current) {
            request.current.cancel();
        }
        dispatch(resetSubagencyTotals());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchSpendingBySubagencyCallback = useCallback(() => {
        if (request.current) {
            request.current.cancel();
        }
        setLoading(true);
        setError(false);
        const params = {
            limit: pageSize,
            page: currentPage,
            sort: subagencyFields[sort],
            order
        };
        const typeParam = awardTypeGroups[type];
        request.current = fetchSubagencySpendingList(toptierCode, fy, typeParam, params);
        const awardSpendingSubagencyRequest = request.current;
        awardSpendingSubagencyRequest.promise
            .then((res) => {
                const parsedData = parseRows(res.data.results);
                setResults(parsedData);
                dispatch(setSubagencyTotals(parsedData));
                setTotalItems(res.data.page_metadata.total);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    useEffect(() => {
        // Reset to the first page
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
        else if (currentPage === 1) {
            if (prevType !== type && prevType) {
                fetchSpendingBySubagencyCallback();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, fy, pageSize, sort, order]);

    useEffect(() => {
        if (fy && toptierCode) {
            fetchSpendingBySubagencyCallback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, fy, toptierCode]);

    return (
        <div className="table-wrapper">
            <Table
                expandable
                rows={results}
                columns={subagencyColumns}
                currentSort={{ field: sort, direction: order }}
                updateSort={updateSort}
                divider={subHeading}
                loading={loading}
                error={error} />
            <Pagination
                currentPage={currentPage}
                changePage={setCurrentPage}
                changeLimit={setPageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
        </div>
    );
};

SubagencyTableContainer.propTypes = propTypes;
export default SubagencyTableContainer;
