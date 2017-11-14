/**
 * EntityDropdownList.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    scope: PropTypes.string,
    matchKey: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.object,
    clickedItem: PropTypes.func
};

const alphabetRegex = /([a-z]|[0-9])/;

const EntityDropdownList = (props) => {
    const options = props.options.map((item, i) => {
        let active = '';
        if (item.code === props.value.code && item.code !== '') {
            active = 'active';
        }

        let letterClass = '';
        // variable matchKeys allow us to match by numeric codes for congressional district
        // instead of display name
        if (item[props.matchKey] !== '') {
            const firstLetter = item[props.matchKey].substring(0, 1).toLowerCase();
            if (alphabetRegex.test(firstLetter)) {
                letterClass = firstLetter;
            }
        }

        return (
            <li
                key={item.code}>
                <button
                    className={`list-item ${active} letter-${letterClass}`}
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
