/**
 * CategoriesTable.jsx
 * Created by Andrea Blackwell 05/03/2024
 **/

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from "data-transparency-ui";
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { throttle } from "lodash";
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
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Table
                classNames="table-for-new-search-page"
                columns={props.columns}
                rows={props.rows}
                isStacked
                isMobile={isMobile} />
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
