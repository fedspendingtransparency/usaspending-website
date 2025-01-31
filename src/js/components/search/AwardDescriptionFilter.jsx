/**
 * AwardDescriptionFilter.jsx
 * Created by Josue Aguilar 01/28/2025
 */

import React from 'react';
import { Button } from "data-transparency-ui";
import PropTypes from "prop-types";
import ShownValue from "./filters/otherFilters/ShownValue";
import SubmitHint from "../sharedComponents/filterSidebar/SubmitHint";

const propTypes = {
    applyAwardDescription: PropTypes.func,
    awardDescription: PropTypes.string,
    inputChangeHandler: PropTypes.func,
    selectedAwardDescription: PropTypes.object,
    removeAwardDescription: PropTypes.func
};

const AwardDescriptionFilter = ({
    applyAwardDescription,
    awardDescription,
    inputChangeHandler,
    selectedAwardDescription,
    removeAwardDescription
}) => {
    const shownAwardDescriptions = [];

    selectedAwardDescription.entrySeq().forEach((description) => {
        const key = description[0];
        const label = description[1];
        const chip = (
            <ShownValue
                label={label}
                key={key}
                removeValue={() => removeAwardDescription(key)} />
        );

        shownAwardDescriptions.push(chip);
    });

    return (
        <div className="filter-item-wrap">
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
                        buttonTitle="Filter by award description"
                        onClick={applyAwardDescription} />
                </form>
                <div className="selected-filters" role="status">
                    {shownAwardDescriptions}
                </div>
                <SubmitHint selectedFilters={selectedAwardDescription} />
            </div>
        </div>
    );
};

AwardDescriptionFilter.propTypes = propTypes;
export default AwardDescriptionFilter;
