/**
 * KeywordFilterGroup.jsx
 * Created by Emily Gullo 03/09/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateTextSearchInput } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object
};

const KeywordFilterGroup = ({ filter }) => {
    const dispatch = useDispatch();
    const keyword = useSelector((state) => state.filters.keyword);

    const generateTags = () => {
    // check to see if a keyword is provided
        const tags = [];

        const keywords = filter.values;

        keywords.forEach((value) => {
            const tag = {
                title: `${value}`,
                unstageFilter: () => dispatch(updateTextSearchInput(value)),
                unstaged: keyword.get(value)
            };

            tags.push(tag);
        });

        return tags;
    };

    const tags = generateTags();

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

KeywordFilterGroup.propTypes = propTypes;
export default KeywordFilterGroup;
