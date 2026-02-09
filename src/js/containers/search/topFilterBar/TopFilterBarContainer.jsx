/**
  * TopFilterBarContainer.jsx
  * Created by Kevin Li 12/13/16
  **/

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import test from './test';

const propTypes = {
    updateFilterCount: PropTypes.func,
    compressed: PropTypes.bool
};

const TopFilterBarContainer = ({ updateFilterCount, compressed = false }) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);

    const { filters, filterCount } = useMemo(() => test(reduxFilters), [reduxFilters]);

    useEffect(() => {
        if (!compressed) {
            updateFilterCount(filterCount);
        }
    }, [compressed, filterCount, updateFilterCount]);

    if (filters && filters?.length > 0) {
        return (
            <TopFilterBar
                filters={filters}
                filterCount={filterCount} />
        );
    }
    return (<></>);
};

TopFilterBarContainer.propTypes = propTypes;

export default TopFilterBarContainer;
