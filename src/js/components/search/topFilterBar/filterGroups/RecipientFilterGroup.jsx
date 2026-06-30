/**
 * RecipientFilterGroup.jsx
 * Created by michaelbray on 2/23/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "../../../../redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string, resultsView: PropTypes.bool };

const RecipientFilterGroup = ({ name, resultsView }) => {
    const selectedRecipients = useSelector((state) => state.filters.selectedRecipients);
    const appliedRecipientType = useSelector(
        (state) => state.appliedFilters.filters.selectedRecipients
    );
    const dispatch = useDispatch();

    const removeFilter = (value, staged) => {
        const newValue = staged ?
            selectedRecipients.delete(value) :
            selectedRecipients.add(value);

        dispatch(updateGenericFilter({
            type: 'selectedRecipients',
            value: newValue
        }));
    };

    const tags = [];

    appliedRecipientType.forEach((value) => {
        const tag = {
            value,
            title: value,
            toggleFilter: removeFilter,
            staged: selectedRecipients.has(value)
        };

        tags.push(tag);
    });

    return (<BaseTopFilterGroup resultsView={resultsView} tags={tags} name={name} />);
};

RecipientFilterGroup.propTypes = propTypes;
export default RecipientFilterGroup;
