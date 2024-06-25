/**
 * CategoriesTable.jsx
 * Created by Andrea Blackwell 05/03/2024
 **/

import React, { useState } from 'react';
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

const CategoriesTable = (props) => {
    const [activateRightFade, setActivateRightFade] = useState(false);
    const checkToAddRightFade = (isScrolledLeft, isScrolledRight) => {
        if (!isScrolledLeft) {
            setActivateRightFade(true);
        }
        if (isScrolledRight) {
            setActivateRightFade(false);
        }
    };

    return (
        <>
            <div className={`advanced-search__table-wrapper ${activateRightFade ? 'activate-right-fade' : ''}`} >
                <Table
                    classNames="table-for-new-search-page award-results-table-dtui"
                    columns={props.columns}
                    rows={props.rows}
                    stickyFirstColumn
                    checkToAddRightFade={checkToAddRightFade} />
            </div>
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
};

CategoriesTable.propTypes = propTypes;
export default CategoriesTable;
