/**
 * StackedCheckbox.jsx
 * Created by Brian Petway on 11/06/24.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import PrimaryCheckboxType from 'components/sharedComponents/checkbox/PrimaryCheckboxType';
import { EntityDropdownAutocomplete } from "../../search/filters/location/EntityDropdownAutocomplete";

const propTypes = {
    checkboxLabel: PropTypes.string,
    checkboxLabelContent: PropTypes.string,
    subheadingLabel: PropTypes.string,
    subheadingLabelContent: PropTypes.string,
    itemName: PropTypes.string,
    itemLabelAfterName: PropTypes.string,
    index: PropTypes.number,
    toggleRecipient: PropTypes.func,
    getRecipientsFromSearchString: PropTypes.func
};

const StackedCheckbox = ({
    checkboxLabel,
    checkboxLabelContent,
    subheadingLabel,
    subheadingLabelContent,
    itemName,
    itemLabelAfterName,
    index,
    toggleRecipient,
    getRecipientsFromSearchString
}) => {
    const [searchString, setSearchString] = useState('');

    const handleTextInputChange = (e) => {
        if (e.target.value.length >= 3) {
            setSearchString(e.target.value);
        }
    };

    useEffect(() => {
        getRecipientsFromSearchString(searchString);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);

    return (
        <div className="stacked-checkbox__container">
            <EntityDropdownAutocomplete
                placeholder="Search filters..."
                enabled
                handleTextInputChange={handleTextInputChange}
                context={{}}
                loading={false}
                searchIcon />
            <PrimaryCheckboxType
                name={(
                    <div className="stacked-checkbox__checkbox-label">
                        <span>{checkboxLabel}</span>{checkboxLabelContent}
                    </div>)}
                value={`primary-checkbox-${index}`}
                key={checkboxLabelContent}
                toggleCheckboxType={toggleRecipient} />
            <div className="stacked-checkbox__lower-container">
                <div
                    className="stacked-checkbox__subheading-label">{subheadingLabel} {subheadingLabelContent}
                </div>
                <div className="stacked-checkbox__name-container">
                    <span className="stacked-checkbox__item-name">{itemName}</span>
                    <span className="stacked-checkbox__item-label-after-name">{itemLabelAfterName}</span>
                </div>
            </div>
        </div>
    );
};

StackedCheckbox.propTypes = propTypes;
export default StackedCheckbox;
