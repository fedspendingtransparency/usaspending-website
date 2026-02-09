/**
  * TopFilterBarContainer.jsx
  * Created by Kevin Li 12/13/16
  **/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import { topFilterGroupGenerator } from
    'components/search/topFilterBar/TopFilterGroupGenerator';
import test from './test';

const propTypes = {
    updateFilterCount: PropTypes.func,
    compressed: PropTypes.bool
};

const TopFilterBarContainer = ({ updateFilterCount, compressed = false }) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);

    const filtersInfo = test(reduxFilters);

    useEffect(() => {
        if (!compressed) {
            updateFilterCount(filtersInfo.filterCount);
        }
    }, [compressed, filtersInfo, updateFilterCount]);

    if (filtersInfo?.filters?.length > 0) {
        return (
            <TopFilterBar
                filters={filtersInfo.filters}
                filterCount={filtersInfo.filterCount}
                groupGenerator={topFilterGroupGenerator} />
        );
    }
    return (<></>);
};

TopFilterBarContainer.propTypes = propTypes;

export default TopFilterBarContainer;
