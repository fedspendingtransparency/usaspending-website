/**
 * KeywordFilterGroup.jsx
 * Created by Emily Gullo 03/09/2017
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const KeywordFilterGroup = ({ name }) => {
    const keyword = useSelector((state) => state.filters.keyword);
    const appliedKeyword = useSelector((state) => state.appliedFilters.filters.keyword);
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ?
            keyword.delete(value) :
            keyword.set(value, value);

        dispatch(updateGenericFilter({
            type: 'keyword',
            value: newValue
        }));
    };

    // check to see if a keyword is provided
    const tags = [];

    appliedKeyword.forEach((value) => {
        tags.push({
            value,
            title: value,
            toggleFilter,
            staged: keyword.get(value)
        });
    });

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

KeywordFilterGroup.propTypes = propTypes;
export default KeywordFilterGroup;
