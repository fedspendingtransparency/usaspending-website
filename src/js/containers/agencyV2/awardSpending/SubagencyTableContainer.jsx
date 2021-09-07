/**
 * SubagencyTableContainer.jsx
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table, Pagination } from 'data-transparency-ui';
import { subagencyColumns, subagencyFields } from 'dataMapping/agency/tableColumns';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import { fetchSubagencySpendingList } from 'apis/agencyV2';
import { parseRows } from 'helpers/agencyV2/BudgetCategoryHelper';
import { useStateWithPrevious } from 'helpers';

const propTypes = {
    agencyId: PropTypes.string,
    fy: PropTypes.string,
    type: PropTypes.string.isRequired,
    prevType: PropTypes.string
};

const SubagencyTableContainer = ({
    fy,
    agencyId,
    type,
    prevType
}) => {
    const [prevPage, currentPage, changeCurrentPage] = useStateWithPrevious(1);
    const [prevPageSize, pageSize, changePageSize] = useStateWithPrevious(10);
    const [totalItems, setTotalItems] = useState(0);
    const [prevSort, sort, setSort] = useStateWithPrevious('totalObligations');
    const [prevOrder, order, setOrder] = useStateWithPrevious('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const dataByYear = useSelector((state) => state.agencyV2.budgetaryResources);
    const agencyObligated = dataByYear[fy]?._agencyObligated;
    const params = awardTypeGroups[type];

    const fetchSpendingByCategoryCallback = useCallback(() => {
        setLoading(true);
        setError(false);
        let request = null;
        if (type !== 'all') {
            request = fetchSubagencySpendingList(agencyId, fy, params);
        }
        request = fetchSubagencySpendingList(agencyId, fy);
        request.promise
            .then((res) => {
                const parsedData = parseRows(res.data.results, agencyObligated);
                setResults(parsedData);
                setTotalItems(res.data.page_metadata.total);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    // const fetchSpendingByCategoryCallback = useCallback(() => {
    //     setLoading(true);
    //     setError(false);
    //     // Make a request with the new page number
    //     const params = {
    //         fiscal_year: fy,
    //         limit: pageSize,
    //         page: currentPage,
    //         sort: subagencyFields[sort],
    //         order
    //     };
    //     const request = fetchSubagencySpendingList(agencyId, fy, params);
    //     request.promise
    //         .then((res) => {
    //             const parsedData = parseRows(res.data.results, agencyObligated);
    //             setResults(parsedData);
    //             setTotalItems(res.data.page_metadata.total);
    //             setLoading(false);
    //         }).catch((err) => {
    //             setError(true);
    //             setLoading(false);
    //             console.error(err);
    //         });
    // });

    useEffect(() => {
        // Reset to the first page
        if (currentPage !== 1) {
            changeCurrentPage(1);
        }
        else if (currentPage === 1) {
            const hasParamChanged = (
                prevSort !== sort ||
                prevOrder !== order ||
                prevPage !== currentPage ||
                prevPageSize !== pageSize ||
                (prevType !== type && prevType)
            );
            if (hasParamChanged) {
                fetchSpendingByCategoryCallback();
            }
        }
    }, [type, fy, agencyId, pageSize, sort, order, agencyObligated]);

    useEffect(() => {
        if (fy) {
            fetchSpendingByCategoryCallback();
        }
    }, [currentPage, fy]);

    console.log(subagencyColumns);

    return (
        <div className="table-wrapper">
            <Table
                expandable
                rows={results}
                columns={subagencyColumns}
                currentSort={{ field: sort, direction: order }}
                updateSort={updateSort}
                loading={loading}
                error={error} />
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
        </div>
    );
};

SubagencyTableContainer.propTypes = propTypes;
export default SubagencyTableContainer;
