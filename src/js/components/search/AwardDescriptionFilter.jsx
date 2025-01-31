/**
 * AwardDescriptionFilter.jsx
 * Created by Josue Aguilar 01/28/2025
 */

import React from 'react';
import { Button } from "data-transparency-ui";
import PropTypes from "prop-types";
import ShownValue from "./filters/otherFilters/ShownValue";

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
}) => (
    <div className="filter-item-wrap">
        <div className="award-description-filter">
            <form
                onSubmit={applyAwardDescription}
                className="award-description-filter__form">
                <div className="award-description-filter__text-field-wrapper">
                    <input
                        id="search"
                        type="text"
                        className="award-description-filter__text-field"
                        placeholder="Search for a description..."
                        value={awardDescription}
                        onChange={inputChangeHandler} />
                </div>
                <Button
                    buttonSize="sm"
                    backgroundColor="light"
                    buttonType="primary"
                    copy="Add"
                    additionalClassnames="award-desscription-filter__add-button"
                    buttonTitle="Filter by award description"
                    onClick={applyAwardDescription} />
            </form>
            <div className="selected-filters" role="status">
                {selectedAwardDescription &&
                        <ShownValue
                            label={selectedAwardDescription}
                            key={selectedAwardDescription}
                            removeValue={removeAwardDescription} />
                }
            </div>
        </div>
    </div>
);

AwardDescriptionFilter.propTypes = propTypes;
export default AwardDescriptionFilter;
