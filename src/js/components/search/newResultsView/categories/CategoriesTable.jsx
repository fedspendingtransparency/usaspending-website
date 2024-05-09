/**
 * CategoriesTable.jsx
 * Created by Andrea Blackwell 05/03/2024
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from "data-transparency-ui";
import CategoriesPagination from "./CategoriesPagination";

const propTypes = {
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    children: PropTypes.node,
    recipientError: PropTypes.bool
};

const CategoriesTable = (props) => (
    <>
        <Table
            classNames="search-results"
            columns={props.columns}
            rows={props.rows} />
        <CategoriesPagination
            nextPage={props.nextPage}
            previousPage={props.previousPage}
            loading={props.loading}
            error={props.error}
            hasNextPage={props.hasNextPage}
            hasPreviousPage={props.hasPreviousPage}
            recipientError={props.recipientError} />
    </>
);

CategoriesTable.propTypes = propTypes;
export default CategoriesTable;
