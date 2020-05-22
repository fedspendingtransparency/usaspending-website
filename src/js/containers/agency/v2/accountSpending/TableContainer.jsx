/**
 * TableContainer.jsx
 * Created by Lizzie Salita 5/22/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'data-transparency-ui';
import { accountColumns } from 'dataMapping/agency/tableColumns';
import { fetchSpendingByCategory } from 'helpers/agencyHelper';

const propTypes = {
    // TODO - when the overview section is complete, get agency ID and FY from Redux
    agencyId: PropTypes.string,
    fy: PropTypes.string,
    type: PropTypes.string.isRequired,
    subHeading: PropTypes.string
};

const TableContainer = (props) => {
    const [page, changePage] = useState(1);
    const [limit, changeLimit] = useState(10);
    const [currentSort, updateSort] = useState({
        field: 'obligated_amount',
        direction: 'desc'
    });
    const [results, setResults] = useState([]);
    useEffect(() => {
        // Reset to the first page
        changePage(1);
        const request = fetchSpendingByCategory(props.agencyId, props.fy, props.type);
        request.promise
            .then((res) => {
                setResults(res.data.results);
            });
    }, [props.type, props.fy, props.agencyId, limit, currentSort]);
    return (
        <Table
            expandable
            rows={results}
            columns={accountColumns[props.type]}
            divider={props.subHeading}
            currentSort={currentSort}
            updateSort={updateSort} />
    );
};

TableContainer.propTypes = propTypes;
export default TableContainer;
