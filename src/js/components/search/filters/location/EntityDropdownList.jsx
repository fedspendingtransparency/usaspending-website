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
    clickedItem: PropTypes.func,
    showNameAndCode: PropTypes.bool
};

const defaultProps = {
    showNameAndCode: false
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

        const displayText = (props.showNameAndCode) ? `${item.name}, ${item.code}` : item.name;
        const handleSelection = props.clickedItem.bind(null, item);

        return (
            <li
                key={item.code}>
                <button
                    className={`list-item ${active} letter-${letterClass}`}
                    title={item.name}
                    aria-label={item.name}
                    data-listindex={i}
                    onMouseDown={handleSelection}>
                    {displayText}
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
EntityDropdownList.defaultProps = defaultProps;

export default EntityDropdownList;
