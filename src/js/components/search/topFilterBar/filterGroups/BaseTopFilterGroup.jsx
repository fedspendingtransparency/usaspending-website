/**
  * BaseTopFilterGroup.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import TopFilterItem from '../TopFilterItem';

const propTypes = {
    filter: PropTypes.object,
    tags: PropTypes.array,
    compressed: PropTypes.bool
};

const BaseTopFilterGroup = ({
    filter,
    tags = [],
    compressed
}) => {
    const tagsArray = tags.map((tag) => (
        <TopFilterItem
            key={`top-tag-${tag.id}-${tag.value}`}
            title={tag.title}
            value={tag.value}
            code={filter.code}
            removeFilter={tag.removeFilter}
            compressed={compressed} />
    ));

    return (
        <div className="filter-group-container">
            <div
                className="filter-group"
                role="group"
                aria-label={filter.name}>
                <div className="filter-group-top">
                    <div className="filter-name">
                        {filter.name}
                    </div>
                </div>
                <div className="filter-group-bottom">
                    <div className="filter-values" role="list">
                        {tagsArray}
                    </div>
                </div>
            </div>
        </div>
    );
};

BaseTopFilterGroup.propTypes = propTypes;
export default BaseTopFilterGroup;
