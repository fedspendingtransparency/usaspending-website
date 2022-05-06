/**
 * PaginatedTooltipContainer.jsx
 * Created By Jonathan Hill 04/29/2020
 */

import React, { cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import TooltipPagination from './PaginatedTooltip';

const propTypes = {
    data: PropTypes.array,
    tooltipElement: PropTypes.element
};


const PaginatedTooltipContainer = ({ data, tooltipElement }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const previousPage = () => {
        const pageValue = currentPage === 1 ? data.length : currentPage - 1;
        setCurrentPage(pageValue);
    };
    const nextPage = () => {
        const pageValue = currentPage === data.length ? 1 : currentPage + 1;
        setCurrentPage(pageValue);
    };
    return (
        <div className="paginated-tooltip">
            {cloneElement(tooltipElement, { data: data[currentPage - 1] })}
            {data.length > 1 && <TooltipPagination
                totalPages={data.length}
                currentPage={currentPage}
                previousPage={previousPage}
                nextPage={nextPage}
                previousPageButtonClassnames="tooltip-pagination-button previous-page-button"
                nextPageButtonClassnames="tooltip-pagination-button next-page-button" />}
        </div>
    );
};

PaginatedTooltipContainer.propTypes = propTypes;
export default PaginatedTooltipContainer;
