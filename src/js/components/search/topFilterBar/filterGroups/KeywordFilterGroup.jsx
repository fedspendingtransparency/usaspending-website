/**
 * KeywordFilterGroup.jsx
 * Created by Emily Gullo 03/09/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateTextSearchInput } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { filter: PropTypes.object };

const KeywordFilterGroup = ({ filter }) => {
    const keyword = useSelector((state) => state.filters.keyword);
    const dispatch = useDispatch();

    const toggleFilter = (value) => dispatch(updateTextSearchInput(value));

    // check to see if a keyword is provided
    const tags = [];

    filter.values.forEach((value) => {
        tags.push({
            value,
            title: value,
            toggleFilter,
            staged: keyword.get(value)
        });
    });

    return (<BaseTopFilterGroup tags={tags} filter={filter} />);
};

KeywordFilterGroup.propTypes = propTypes;
export default KeywordFilterGroup;
