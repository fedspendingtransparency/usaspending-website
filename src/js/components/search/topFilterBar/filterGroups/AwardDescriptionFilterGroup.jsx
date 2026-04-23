/**
 * AwardDescriptionFilterGroup.jsx
 * Created by Josue Aguilar 4/20/2026
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { updateGenericFilter } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string, resultsView: PropTypes.bool };

const AwardDescriptionFilterGroup = ({ name, resultsView }) => {
    const awardDescription = useSelector((state) => state.filters.awardDescription);
    const appliedAwardDescription = useSelector(
        (state) => state.appliedFilters.filters.awardDescription
    );
    const dispatch = useDispatch();

    const toggleFilter = (value, staged) => {
        const newValue = staged ? '' : value;

        dispatch(updateGenericFilter({
            type: 'awardDescription',
            value: newValue
        }));
    };

    const tags = [{
        value: appliedAwardDescription,
        title: appliedAwardDescription,
        toggleFilter,
        staged: awardDescription === appliedAwardDescription
    }];

    return (<BaseTopFilterGroup resultsView={resultsView} tags={tags} name={name} />);
};

AwardDescriptionFilterGroup.propTypes = propTypes;
export default AwardDescriptionFilterGroup;
