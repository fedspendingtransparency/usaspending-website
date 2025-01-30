/**
 * AwardDescriptionFilterContainer.jsx
 * Created by Josue Aguilar 01/28/2025
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGenericFilter } from 'redux/actions/search/searchFilterActions';
import AwardDescriptionFilter from "../../../components/search/AwardDescriptionFilter";

const AwardDescriptionFilterContainer = () => {
    const [awardDescription, setAwardDescription] = useState('');

    const dispatch = useDispatch();
    const { awardDescription: selectedAwardDescription } = useSelector((state) => state.filters);

    const applyAwardDescription = (e) => {
        e.preventDefault();
        dispatch(updateGenericFilter({
            type: 'awardDescription',
            value: selectedAwardDescription.set(awardDescription, awardDescription)
        }));
    };

    const removeAwardDescription = () => console.log('removeAwardDescription');

    const inputChangeHandler = (e) => {
        setAwardDescription(e.target.value);
        console.log(e.target.value);
    };

    return (
        <AwardDescriptionFilter
            applyAwardDescription={applyAwardDescription}
            awardDescription={awardDescription}
            inputChangeHandler={inputChangeHandler}
            selectedAwardDescription={selectedAwardDescription}
            removeAwardDescription={removeAwardDescription} />
    );
};

export default AwardDescriptionFilterContainer;
