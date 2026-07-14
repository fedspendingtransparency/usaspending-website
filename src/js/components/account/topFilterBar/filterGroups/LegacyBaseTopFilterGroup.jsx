/**
  * LegacyBaseTopFilterGroup.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';
import LegacyTopFilterItem from '../LegacyTopFilterItem';

const propTypes = {
    filter: PropTypes.object,
    tags: PropTypes.array,
    clearFilterGroup: PropTypes.func,
    compressed: PropTypes.bool
};

const LegacyBaseTopFilterGroup = ({
    tags = [], compressed = false, filter, clearFilterGroup
}) => {
    let hideCompressed = '';
    let showClose = '';

    if (compressed) {
        hideCompressed = 'hide';
    }

    const mappedTags = tags.map((tag) => (
        <LegacyTopFilterItem
            key={`top-tag-${filter.code}-${tag.value}`}
            title={tag.title}
            value={tag.value}
            code={filter.code}
            removeFilter={tag.removeFilter}
            compressed={compressed} />
    ));

    if (mappedTags.length < 2) {
        showClose = ' hide';
    }

    return (
        <div className="filter-group-container">
            <div className="filter-group">
                <div className={`filter-group-top ${hideCompressed}`}>
                    <div className="filter-name">
                        {filter.name}:
                    </div>
                    <div className={`filter-group-close${showClose}`}>
                        <button
                            title={`Clear all ${filter.name} filters`}
                            aria-label={`Clear all ${filter.name} filters`}
                            onClick={clearFilterGroup}>
                            <span className="close-icon">
                                <Icons.Close
                                    alt={`Clear all ${filter.name} filters`} />
                            </span>
                        </button>
                    </div>
                </div>
                <div className="filter-group-bottom">
                    <div className="filter-values">
                        {mappedTags}
                    </div>
                </div>
            </div>
        </div>
    );
};

LegacyBaseTopFilterGroup.propTypes = propTypes;
export default LegacyBaseTopFilterGroup;
