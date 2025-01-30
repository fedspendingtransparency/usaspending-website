/**
 * AwardDescriptionFilterContainer.jsx
 * Created by Josue Aguilar 01/28/2025
 */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateGenericFilter } from 'redux/actions/search/searchFilterActions';
import AwardDescriptionFilter from "../../../components/search/AwardDescriptionFilter";

const AwardDescriptionFilterContainer = () => {
    const [awardDescription, setAwardDescription] = useState('');

    const dispatch = useDispatch();

    const applyAwardDescription = (e) => {
        e.preventDefault();
        dispatch(updateGenericFilter({
            type: 'awardDescription',
            value: awardDescription
        }));
    };

    const inputChangeHandler = (e) => {
        setAwardDescription(e.target.value);
        console.log(e.target.value);
    };

    return (
        <AwardDescriptionFilter
            applyAwardDescription={applyAwardDescription}
            awardDescription={awardDescription}
            inputChangeHandler={inputChangeHandler} />
    );
};

export default AwardDescriptionFilterContainer;
