/**
  * BaseTopFilterGroup.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from "lodash-es";

import TopFilterItem from './TopFilterItem';

const propTypes = {
    filter: PropTypes.object,
    tags: PropTypes.array
};

const BaseTopFilterGroup = ({
    filter,
    tags = []
}) => {
    const tagsArray = tags.map(({ title, unstageFilter, unstaged }) => (
        <TopFilterItem
            title={title}
            unstageFilter={unstageFilter}
            unstaged={unstaged}
            key={`top-tag-${title}-${uniqueId()}`} />
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
