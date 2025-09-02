/**
  * CategoriesSectionWrapper.jsx
  * Created by Andrea Blackwell 05/03/2024
  **/

import React from 'react';
import PropTypes from 'prop-types';
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

const CategoriesSectionWrapper = ({
    nextPage,
    previousPage,
    loading,
    error,
    hasNextPage,
    hasPreviousPage,
    children,
    recipientError
}) => (
    <>
        {children}
        <CategoriesPagination
            nextPage={nextPage}
            previousPage={previousPage}
            loading={loading}
            error={error}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            recipientError={recipientError} />
    </>
);

CategoriesSectionWrapper.propTypes = propTypes;
export default CategoriesSectionWrapper;
