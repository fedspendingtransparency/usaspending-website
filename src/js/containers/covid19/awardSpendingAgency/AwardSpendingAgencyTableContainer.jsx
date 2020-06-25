/**
 * AwardSpendingAgencyTableContainer.jsx
 * Created by James Lee 6/24/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';
import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { awardSpendingAgencyTableColumns, awardSpendingAgencyTableColumnFieldMapping, awardSpendingAgencyTableTabs } from 'dataMapping/covid19/awardSpendingAgency/awardSpendingAgencyTableTabs';
import { fetchAwardSpendingByAgency } from 'helpers/disasterHelper';
import BaseAwardSpendingByAgencyRow from 'models/covid19/awardSpendingAgency/BaseAwardSpendingByAgencyRow';


const propTypes = {
    type: PropTypes.string.isRequired
};

const AwardSpendingAgencyTableContainer = (props) => {
    const [currentPage, changeCurrentPage] = useState(1);
    const [pageSize, changePageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState('obligation');
    const [order, setOrder] = useState('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const defCodes = useSelector((state) => state.covid19.defCodes);

    const parseAwardSpendingByAgency = (data) => {
        // const parsedData = data.map((row) => {
        //     const budgetCategoryRow = Object.create(BaseAwardSpendingByAgencyRow);
        //     budgetCategoryRow.populate(row);
        //     return budgetCategoryRow;
        // });
        // setResults(parsedData);
    };

    const fetchSpendingByCategoryCallback = useCallback(() => {
        setLoading(false);
        setError(true);
        // Make a request with the new page number
        const params = {
            filter: {
                def_codes: defCodes.map((defc) => defc.code),
                award_type_codes: awardSpendingAgencyTableTabs.filter((type) => type === props.type).codes
            },
            pagination: {
                limit: pageSize,
                page: currentPage,
                sort: awardSpendingAgencyTableColumnFieldMapping[sort],
                order
            },
            spending_type: 'total'
        };

        // TODO - Add request
        const request = fetchAwardSpendingByAgency(params);
        request.promise
            .then((res) => {
                console.log(res.data);
                // parseAccount(res.data.results);
                parseAwardSpendingByAgency(res.data.results);
                setTotalItems(res.data.pagination_metadata.total);
                setLoading(false);
                setError(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    });

    useEffect(() => {
        // Reset to the first page
        changeCurrentPage(1);
        fetchSpendingByCategoryCallback();
    }, [props.type, props.fy, props.agencyId, pageSize, sort, order]);

    useEffect(() => {
        fetchSpendingByCategoryCallback();
    }, [currentPage]);

    let message = null;
    if (loading) {
        message = (
            <div className="results-table-message-container">
                <ResultsTableLoadingMessage />
            </div>
        );
    } else if (error) {
        message = (
            <div className="results-table-message-container">
                <ResultsTableErrorMessage />
            </div>
        );
    }

    if (message) {
        return (
            <>
                <CSSTransitionGroup
                    transitionName="table-message-fade"
                    transitionLeaveTimeout={225}
                    transitionEnterTimeout={195}
                    transitionLeave>
                    {message}
                </CSSTransitionGroup>
                <Pagination
                    currentPage={currentPage}
                    changePage={changeCurrentPage}
                    changeLimit={changePageSize}
                    limitSelector
                    resultsText
                    pageSize={pageSize}
                    totalItems={totalItems} />
            </>
        );
    }

    return (
        <>
            <Table
                expandable
                rows={results}
                columns={awardSpendingAgencyTableColumns(awardSpendingAgencyTableTabs.filter((tab) => tab.internal === props.type)[0].columnName)}
                currentSort={{ field: sort, direction: order }}
                updateSort={updateSort} />
            <Pagination
                currentPage={currentPage}
                changePage={changeCurrentPage}
                changeLimit={changePageSize}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
        </>
    );
};

AwardSpendingAgencyTableContainer.propTypes = propTypes;
export default AwardSpendingAgencyTableContainer;
