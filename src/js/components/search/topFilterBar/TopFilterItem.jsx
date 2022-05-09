/**
  * TopFilterItem.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string.isRequired
};

const defaultProps = {
    title: 'Filter'
};

const TopFilterItem = (props) => (
    <div className="filter-item-container">
        <div
            className="filter-item"
            role="listitem">
            <div className="filter-item-title">
                {props.title}
            </div>
        </div>
    </div>
);

TopFilterItem.propTypes = propTypes;
TopFilterItem.defaultProps = defaultProps;

export default TopFilterItem;
