/**
 * CategoriesPagination.jsx
 * Created by Andrea Blackwell 05/03/2024
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

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

const CategoriesPagination = (props) => {
    const clickPrevious = () => {
        props.previousPage();
    };

    const clickNext = () => {
        props.nextPage();
    };

    const disableNext = !props.hasNextPage || props.recipientError;
    const disablePrev = !props.hasPreviousPage;
    let hidePager = '';

    if ((disableNext && disablePrev) || props.loading || props.error) {
        hidePager = 'hide';
    }
    if (props.recipientError) {
        hidePager = '';
    }

    return (
        <div className={`visualization-pager-container ${hidePager}`}>
            <button
                className="visualization-pager"
                title="Show previous ten"
                aria-label="Show previous ten"
                disabled={disablePrev}
                onClick={clickPrevious}>
                <div className="pager-content">
                    <div className="icon">
                        <Icons.AngleLeft alt="Show previous ten" />
                    </div>
                    <div className="pager-label">
                        Show previous ten
                    </div>
                </div>
            </button>
            <button
                className="visualization-pager"
                title="Show next ten"
                aria-label="Show next ten"
                disabled={disableNext}
                onClick={clickNext}>
                <div className="pager-content">
                    <div className="pager-label next">
                        Show next ten
                    </div>
                    <div className="icon">
                        <Icons.AngleRight alt="Show next ten" />
                    </div>
                </div>
            </button>
        </div>);
};

CategoriesPagination.propTypes = propTypes;
export default CategoriesPagination;
