/**
 * AwardDescriptionFilter.jsx
 * Created by Josue Aguilar 01/28/2025
 */

import React from 'react';
import { Button } from "data-transparency-ui";

const AwardDescriptionFilter = ({ placeholder }) => {
    const placeholder2 = 'placeholder2';

    return (
        <div className="award-description-filter">
            <input
                id="search"
                type="text"
                className="award-description-filter__text-field"
                placeholder={placeholder} />
            <Button
                buttonSize="sm"
                backgroundColor="light"
                buttonType="primary"
                copy={placeholder2}
                additionalClassnames="award-desscription-filter__add-button"
                buttonTitle="Filter by award description" />
        </div>
    );
};

export default AwardDescriptionFilter;
