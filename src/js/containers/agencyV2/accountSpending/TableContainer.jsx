/**
 * TableContainer.jsx
 * Created by Lizzie Salita 5/22/20
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table, Pagination } from 'data-transparency-ui';
import { accountColumns, accountFields } from 'dataMapping/agency/tableColumns';
import { fetchSpendingByCategory } from 'apis/agencyV2';
import BaseAccountSpendingRow from 'models/v2/agencyV2/BaseAccountSpendingRow';
import { useStateWithPrevious } from 'helpers';

const propTypes = {
    agencyId: PropTypes.string,
    fy: PropTypes.string,
    type: PropTypes.string.isRequired,
    subHeading: PropTypes.string
};

const parseAccount = (data, totalObligation) => {
    // add total obligation to each object and it's children objects
    const dataAndTotalObligation = data.map((d) => {
        let dataChildrenAndTotalObligation = [];
        if (d.children && d.children.length > 0) {
            dataChildrenAndTotalObligation = d.children.map((child) => ({
                ...child,
                total_obligated_amount: totalObligation
            }));
        }

        if (dataChildrenAndTotalObligation.length > 0) {
            return {
                ...d,
                children: dataChildrenAndTotalObligation,
                total_obligated_amount: totalObligation
            };
        }

        return {
            ...d,
            total_obligated_amount: totalObligation
        };
    });

    // parse row and row's children
    return dataAndTotalObligation.map((item) => {
        const accountSpendingRow = Object.create(BaseAccountSpendingRow);
        accountSpendingRow.populate(item);

        let rowChildren = [];
        if (item.children && item.children.length > 0) {
            rowChildren = item.children.map((childItem) => {
                const accountChildSpendingRow = Object.create(BaseAccountSpendingRow);
                accountChildSpendingRow.populate(childItem);
                return accountChildSpendingRow;
            });
        }

        if (rowChildren && rowChildren.length > 0) {
            Object.defineProperty(accountSpendingRow, "children", {
                value: rowChildren
            });
        }

        return accountSpendingRow;
    });
};


const TableContainer = (props) => {
    const [prevPage, currentPage, changeCurrentPage] = useStateWithPrevious(1);
    const [prevPageSize, pageSize, changePageSize] = useStateWithPrevious(10);
    const [totalItems, setTotalItems] = useState(0);
    const [prevSort, sort, setSort] = useStateWithPrevious('obligatedAmount');
    const [prevOrder, order, setOrder] = useStateWithPrevious('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const totalObligation = useSelector((state) => state.agencyV2.budgetaryResources._agencyTotalObligated);

    const fetchSpendingByCategoryCallback = useCallback(() => {
        setLoading(true);
        setError(false);
        // Make a request with the new page number
        const params = {
            fiscal_year: props.fy,
            limit: pageSize,
            page: currentPage,
            sort: accountFields[sort],
            order
        };
        const request = fetchSpendingByCategory(props.agencyId, props.type, params);
        request.promise
            .then((res) => {
                const parsedData = parseAccount(res.data.results, totalObligation);
                setResults(parsedData);
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
            changeCurrentPage(1);
        }
        else if (currentPage === 1) {
            const hasParamChanged = (
                prevSort !== sort ||
                prevOrder !== order ||
                prevPage !== currentPage ||
                prevPageSize !== pageSize
            );
            if (hasParamChanged) {
                fetchSpendingByCategoryCallback();
            }
        }
    }, [props.type, props.agencyId, pageSize, sort, order, totalObligation]);

    useEffect(() => {
        if (props.fy) {
            fetchSpendingByCategoryCallback();
        }
    }, [currentPage, props.fy]);

    return (
        <div className="table-wrapper">
            <Table
                expandable
                rows={results}
                columns={accountColumns[props.type]}
                divider={props.subHeading}
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

TableContainer.propTypes = propTypes;
export default TableContainer;
