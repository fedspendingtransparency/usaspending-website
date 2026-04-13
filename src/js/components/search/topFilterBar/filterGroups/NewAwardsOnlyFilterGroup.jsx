/**
 * NewAwardsOnlyFilterGroup.jsx
 * Created by Brian Petway 07/10/2023
 */

import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { updateNewAwardsOnlySelected } from "redux/actions/search/searchFilterActions";
import BaseTopFilterGroup from '../BaseTopFilterGroup';

const propTypes = { name: PropTypes.string };

const NewAwardsOnlyFilterGroup = ({ name }) => {
    const dispatch = useDispatch();
    const newAwards = useSelector((state) => state.filters.filterNewAwardsOnlySelected);

    const toggleFilter = (value) => {
        dispatch(updateNewAwardsOnlySelected(!value));
    };

    const tags = [{
        value: newAwards,
        title: 'Show New Awards Only',
        toggleFilter,
        staged: newAwards
    }];

    return (<BaseTopFilterGroup tags={tags} name={name} />);
};

NewAwardsOnlyFilterGroup.propTypes = propTypes;
export default NewAwardsOnlyFilterGroup;
