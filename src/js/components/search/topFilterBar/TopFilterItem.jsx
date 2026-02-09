/**
  * TopFilterItem.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "data-transparency-ui";

const propTypes = {
    title: PropTypes.string.isRequired,
    unstageFilter: PropTypes.func,
    unstaged: PropTypes.bool
};

const TopFilterItem = ({ title = 'Filter', unstageFilter, unstaged }) => {
    const className = `filter-item${unstaged ? ' unstaged' : ''}`;

    return (
        <div className="filter-item-container">
            <Button
                copy={title}
                buttonTitle={title}
                buttonSize="sm"
                buttonType="tertiary"
                backgroundColor="light"
                additionalClassnames={className}
                onClick={unstageFilter} />
        </div>
    );
};

TopFilterItem.propTypes = propTypes;

export default TopFilterItem;
