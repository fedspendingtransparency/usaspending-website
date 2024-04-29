/**
 * NewSearchScreen.jsx
 * Created by Josue Aguilar 4/23/2024
 */

import React from 'react';
import Button from "../../sharedComponents/buttons/Button";

const NewSearchScreen = () => (
    <div className="new-search-container">
        <img
            className="new-search-icon"
            src="graphics/award-search-default-empty-state.svg"
            alt="alt-text" />
        <p>Start your search by adding filters</p>
        <Button
            buttonSize="md"
            copy="See spending from last year"
            buttonTitle="See spending from last year"
            buttonType="primary"
            backgroundColor="light" />
    </div>
);

export default NewSearchScreen;
