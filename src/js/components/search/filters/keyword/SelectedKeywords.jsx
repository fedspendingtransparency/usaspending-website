/**
 * SelectedKeywords.jsx
 * Created by David Trinh on 5/2/18.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ShownValue from 'components/search/filters/otherFilters/ShownValue';
import { useSelector } from "react-redux";

const propTypes = {
    toggleKeyword: PropTypes.func
};

const SelectedKeywords = ({ toggleKeyword }) => {
    const keywords = useSelector((state) => state.filters.keyword);
    const selectedKeywords = keywords.toArray();

    let hideTags = 'hide';
    if (selectedKeywords.length !== 0) {
        hideTags = '';
    }
    const shownKeywords = selectedKeywords.map((keyword) => {
        const removeValue = () => toggleKeyword(keyword);
        return (
            <ShownValue
                label={keyword}
                key={keyword}
                removeValue={removeValue} />
        );
    });

    return (
        <div
            className={`selected-filters ${hideTags}`}
            id="selected-keyword-tags"
            role="status">
            {shownKeywords}
        </div>
    );
};

SelectedKeywords.propTypes = propTypes;
export default SelectedKeywords;
