/**
 * EntityDropdownList.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const propTypes = {
    scope: PropTypes.string,
    matchKey: PropTypes.string,
    options: PropTypes.array,
    selectedItem: PropTypes.string,
    clickedItem: PropTypes.func
};

const alphabetRegex = /([a-z]|[0-9])/;

const EntityDropdownList = (props) => {
    const {
        scope,
        matchKey,
        selectedItem,
        options,
        clickedItem
    } = props;
    const list = options.map((item, i) => {
        let active = '';
        if (item[matchKey] === selectedItem && selectedItem !== '') {
            active = 'active';
        }

        let letterClass = '';
        const noResultsFound = item.code === "NA-000" ? "no-matching-results" : "";
        // variable matchKeys allow us to match by numeric codes for congressional district
        // instead of display name
        if (item[matchKey] !== '') {
            const firstLetter = item[matchKey].substring(0, 1).toLowerCase();
            if (alphabetRegex.test(firstLetter)) {
                letterClass = firstLetter;
            }
        }

        const handleSelection = clickedItem.bind(null, item);

        return (
            <li
                key={uniqueId(item.code)}>
                <button
                    className={`list-item ${active} letter-${letterClass} ${noResultsFound}`}
                    title={item.name}
                    aria-label={item.name}
                    data-listindex={i}
                    onMouseDown={handleSelection}>
                    {item.name}
                </button>
            </li>
        );
    });

    return (
        <ul
            id={`geo-dropdown-${scope}`}
            className="geo-entity-list"
            role="listbox">
            {list}
        </ul>
    );
};

EntityDropdownList.propTypes = propTypes;

export default EntityDropdownList;
