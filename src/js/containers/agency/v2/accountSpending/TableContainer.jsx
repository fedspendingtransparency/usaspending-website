/**
 * TableContainer.jsx
 * Created by Lizzie Salita 5/22/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table, Pagination } from 'data-transparency-ui';
import { accountColumns } from 'dataMapping/agency/tableColumns';
import { fetchSpendingByCategory } from 'helpers/agencyV2Helper';

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
    const [sort, setSort] = useState('obligated_amount');
    const [order, setOrder] = useState('desc');
    const updateSort = (field, direction) => {
        setSort(field);
        setOrder(direction);
    };
    const [results, setResults] = useState([]);
    // TODO - use totalObligation to calculate '% of Total Obligations' column value
    const totalObligation = useSelector((state) => state.agencyV2.budgetaryResources._agencyTotalObligated);
    useEffect(() => {
        // Reset to the first page
        changePage(1);
        const params = {
            fiscal_year: props.fy,
            limit: pageSize,
            sort,
            order
        };
        const request = fetchSpendingByCategory(props.agencyId, props.type, params);
        request.promise
            .then((res) => {
                // TODO - parse results via a data model
                setResults(res.data.results);
                setTotalItems(res.data.page_metadata.total);
            });
    }, [props.type, props.fy, props.agencyId, pageSize, sort, order]);

    useEffect(() => {
        // Make a request with the new page number
        const params = {
            fiscal_year: props.fy,
            limit: pageSize,
            page: currentPage,
            sort,
            order
        };
        const request = fetchSpendingByCategory(props.agencyId, props.type, params);
        request.promise
            .then((res) => {
                // TODO - parse results via a data model
                setResults(res.data.results);
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
