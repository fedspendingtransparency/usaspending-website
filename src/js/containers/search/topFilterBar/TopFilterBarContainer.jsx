/**
  * TopFilterBarContainer.jsx
  * Created by Kevin Li 12/13/16
  **/

import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TopFilterBar from 'components/search/topFilterBar/TopFilterBar';
import getFilters from './getFilters';

const propTypes = {
    setFilterCount: PropTypes.func,
    compressed: PropTypes.bool
};

const TopFilterBarContainer = ({ setFilterCount, compressed = false }) => {
    const reduxFilters = useSelector((state) => state.appliedFilters.filters);

    const { filters, filterCount } = useMemo(
        () => getFilters(reduxFilters)
        , [reduxFilters]);

    useEffect(() => {
        if (!compressed) {
            setFilterCount(filterCount);
        }
    }, [compressed, filterCount, setFilterCount]);

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
