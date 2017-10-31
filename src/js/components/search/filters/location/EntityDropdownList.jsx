/**
 * EntityDropdownList.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    scope: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.object,
    clickedItem: PropTypes.func
};

const EntityDropdownList = (props) => {
    const options = props.options.map((item, i) => {
        let active = '';
        if (item.code === props.value.code && item.code !== '') {
            active = 'active';
        }
        return (
            <li
                key={item.code}>
                <button
                    className={`list-item ${active}`}
                    title={item.name}
                    aria-label={item.name}
                    role="listitem"
                    data-listindex={i}
                    onClick={props.clickedItem.bind(null, item)}>
                    {item.name}
                </button>
            </li>
        );
    });

    return (
        <ul
            id={`geo-dropdown-${props.scope}`}
            className="geo-entity-list"
            role="listbox">
            {options}
        </ul>
    );
};

EntityDropdownList.propTypes = propTypes;

export default EntityDropdownList;
