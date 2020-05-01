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

const defaultPreviousPageButtonClassnames = 'tooltip-pagination-button previous-page-button';
const defaultNextPageButtonClassnames = 'tooltip-pagination-button next-page-button';

const PaginatedTooltipContainer = ({ data, tooltipElement }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const previousPage = () => setCurrentPage(currentPage - 1);
    const nextPage = () => setCurrentPage(currentPage + 1);
    const previousPageButtonIsDisabled = currentPage === 1;
    const nextPageButtonIsDisabled = currentPage === data.length;
    return (
        <div className="paginated-tooltip">
            {cloneElement(tooltipElement, { data: data[currentPage - 1] })}
            {data.length > 1 && <TooltipPagination
                totalPages={data.length}
                currentPage={currentPage}
                previousPage={previousPage}
                nextPage={nextPage}
                previousPageButtonIsDisabled={previousPageButtonIsDisabled}
                nextPageButtonIsDisabled={nextPageButtonIsDisabled}
                previousPageButtonClassnames={previousPageButtonIsDisabled ?
                    `${defaultPreviousPageButtonClassnames} disabled` :
                    defaultPreviousPageButtonClassnames}
                nextPageButtonClassnames={nextPageButtonIsDisabled ?
                    `${defaultNextPageButtonClassnames} disabled` :
                    defaultNextPageButtonClassnames} />}
        </div>
    );
};

PaginatedTooltipContainer.propTypes = propTypes;
export default PaginatedTooltipContainer;
