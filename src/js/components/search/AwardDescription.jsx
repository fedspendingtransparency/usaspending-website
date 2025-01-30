/**
 * AwardDescriptionFilter.jsx
 * Created by Josue Aguilar 01/28/2025
 */

import React from 'react';
import { Button } from "data-transparency-ui";
import PropTypes from "prop-types";

const propTypes = {
    applyAwardDescription: PropTypes.func,
    awardDescription: PropTypes.string,
    inputChangeHandler: PropTypes.func
};

const AwardDescriptionFilter = ({
    applyAwardDescription, awardDescription, inputChangeHandler
}) => {
    const placeholder2 = 'placeholder2';

    return (
        <div className="award-description-filter">
            <form
                onSubmit={applyAwardDescription}
                className="award-description-filter__form">
                <input
                    id="search"
                    type="text"
                    className="award-description-filter__text-field"
                    placeholder="Search for a description..."
                    value={awardDescription}
                    onChange={inputChangeHandler} />
                <Button
                    buttonSize="sm"
                    backgroundColor="light"
                    buttonType="primary"
                    copy="add"
                    additionalClassnames="award-desscription-filter__add-button"
                    buttonTitle="Filter by award description" />
            </form>
        </div>
    );
};

AwardDescriptionFilter.propTypes = propTypes;
export default AwardDescriptionFilter;
