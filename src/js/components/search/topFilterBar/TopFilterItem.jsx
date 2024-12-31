/**
  * TopFilterItem.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string.isRequired
};

const TopFilterItem = ({ title = 'Filter' }) => (
    <div className="filter-item-container">
        <div
            className="filter-item"
            role="listitem">
            <div className="filter-item-title">
                {title}
            </div>
        </div>
    </div>
);

TopFilterItem.propTypes = propTypes;

export default TopFilterItem;
