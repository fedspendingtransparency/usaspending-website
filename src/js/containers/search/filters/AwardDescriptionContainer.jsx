/**
 * AwardDescriptionFilterContainer.jsx
 * Created by Josue Aguilar 01/28/2025
 */

import React, { useState } from 'react';
import AwardDescriptionFilter from "../../../components/search/AwardDescription";

const AwardDescriptionFilterContainer = () => {
    const [awardDescription, setAwardDescription] = useState('');

    const applyAwardDescription = (e) => {
        e.preventDefault();
        console.log('award description');
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
