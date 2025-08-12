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

const TabItem = (props) => {
    const clickedButton = () => {
        props.clickedTab(props.type);
    };


    let active = '';
    if (props.active) {
        active = 'active';
    }

    return (
        <li>
            <button
                className={`definition-tab ${active}`}
                aria-label={props.label}
                title={props.label}
                onClick={clickedButton}>
                {props.label}
            </button>
        </li>
    );
};

TabItem.propTypes = propTypes;
export default TabItem;
