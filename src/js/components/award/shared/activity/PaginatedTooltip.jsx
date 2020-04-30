/**
 * PaginatedTooltip.jsx
 * Created By Jonathan Hill 04/30/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    previousPage: PropTypes.func,
    nextPage: PropTypes.func,
    previousPageButtonClassnames: PropTypes.string,
    nextPageButtonClassnames: PropTypes.string,
    previousPageButtonIsDisabled: PropTypes.bool,
    nextPageButtonIsDisabled: PropTypes.bool
};

const PaginatedTooltip = ({
    totalPages,
    currentPage,
    previousPage,
    nextPage,
    previousPageButtonClassnames,
    nextPageButtonClassnames,
    previousPageButtonIsDisabled,
    nextPageButtonIsDisabled
}) => (
    <div className="tooltip-pagination-container">
        <button
            disabled={previousPageButtonIsDisabled}
            onClick={previousPage}
            className={previousPageButtonClassnames}>
            <FontAwesomeIcon icon="caret-left" />
        </button>
        <div className="pagination-text">
            {currentPage} of {totalPages} modifications made on this day
        </div>
        <button
            disabled={nextPageButtonIsDisabled}
            onClick={nextPage}
            className={nextPageButtonClassnames}>
            <FontAwesomeIcon icon="caret-right" />
        </button>
    </div>
);

PaginatedTooltip.propTypes = propTypes;
export default PaginatedTooltip;
