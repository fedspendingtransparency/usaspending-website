/**
 * TabItem.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    active: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
    clickedTab: PropTypes.func
};

const TabItem = ({
    active, label, type, clickedTab
}) => {
    const clickedButton = () => {
        clickedTab(type);
    };


    let activeLocal = '';
    if (active) {
        activeLocal = 'active';
    }

    return (
        <li>
            <button
                className={`definition-tab ${activeLocal}`}
                aria-label={label}
                title={label}
                onClick={clickedButton}>
                {label}
            </button>
        </li>
    );
};

TabItem.propTypes = propTypes;
export default TabItem;
