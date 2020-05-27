/**
 * TableContainer.jsx
 * Created by Lizzie Salita 5/22/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table, Pagination } from 'data-transparency-ui';
import { accountColumns, accountFields } from 'dataMapping/agency/tableColumns';
import { fetchSpendingByCategory } from 'helpers/agencyV2Helper';
import BaseAccountSpendingRow from '../../../../models/v2/account/BaseAccountSpendingRow';

const propTypes = {
    // TODO - when the overview section is complete, get agency ID and FY from Redux
    agencyId: PropTypes.string,
    fy: PropTypes.string,
    type: PropTypes.string.isRequired,
    subHeading: PropTypes.string
};

const TableContainer = (props) => {
    const [currentPage, changePage] = useState(1);
    const [pageSize, changeLimit] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState('obligatedAmount');
    const [order, setOrder] = useState('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const [results, setResults] = useState([]);
    // TODO - use totalObligation to calculate '% of Total Obligations' column value
    const totalObligation = useSelector((state) => state.agencyV2.budgetaryResources._agencyTotalObligated);

    const parseAccount = (data) => {
        if (totalObligation) {
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
            const parsedData = dataAndTotalObligation.map((item) => {
                let rowChildren = [];
                const accountSpendingRow = Object.create(BaseAccountSpendingRow);
                accountSpendingRow.populate(item);


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
            setResults(parsedData);
        }
    };

    useEffect(() => {
        // Reset to the first page
        changePage(1);
        const params = {
            fiscal_year: props.fy,
            limit: pageSize,
            sort: accountFields[sort],
            order
        };
        const request = fetchSpendingByCategory(props.agencyId, props.type, params);
        request.promise
            .then((res) => {
                parseAccount(res.data.results);
                setTotalItems(res.data.page_metadata.total);
            });
    }, [props.type, props.fy, props.agencyId, pageSize, sort, order, totalObligation]);

    useEffect(() => {
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
                parseAccount(res.data.results);
            });
    }, [currentPage]);

    return (
        <>
            <Table
                expandable
                rows={results}
                columns={accountColumns[props.type]}
                divider={props.subHeading}
                currentSort={{ field: sort, direction: order }}
                updateSort={updateSort} />
            <Pagination
                currentPage={currentPage}
                changePage={changePage}
                changeLimit={changeLimit}
                limitSelector
                resultsText
                pageSize={pageSize}
                totalItems={totalItems} />
        </>
    );
};

TableContainer.propTypes = propTypes;
export default TableContainer;
