/**
 * TempSearchSectionWrapper.jsx
 * Created by Josue Aguilar 3/19/2024
 */

import React, { useState } from 'react';
import PropTypes from "prop-types";
import NewPicker from "../sharedComponents/dropdowns/NewPicker";

const propTypes = {
    sectionTitle: PropTypes.string,
    dropdownOptions: PropTypes.array,
    selectedDropdownOption: PropTypes.number,
    isVisualization: PropTypes.bool,
    children: PropTypes.string || PropTypes.element,
    dsmContent: PropTypes.string
};

const onClick = () => {
    console.log('dropdown');
};

const defaultProps = {
    sectionTitle: 'Section Title',
    dropdownOptions: [
        {
            name: 'Option 0',
            value: 0,
            onClick
        },
        {
            name: 'Option 1',
            value: 1,
            onClick
        },
        {
            name: 'Option 2',
            value: 2,
            onClick
        }
    ],
    selectedDropdownOption: 0,
    isVisualization: true,
    children: 'children',
    dsmContent: 'content'
};

const TempSearchSectionWrapper = ({
    sectionTitle,
    dropdownOptions,
    selectedDropdownOption,
    isVisualization,
    children,
    dsmContent
}) => {
    const [selectedDropdown, setSelectedDropdown] = useState(selectedDropdownOption);

    const sortFn = () => dropdownOptions;

    return (
        <div>
            <div>{sectionTitle}</div>
            <NewPicker
                leftIcon=""
                size="sm"
                options={dropdownOptions}
                selectedOption={dropdownOptions.length
                    ? dropdownOptions.find((obj) => obj.value === selectedDropdown).name
                    : `${selectedDropdown}`}
                sortFn={sortFn} />
            <div>{isVisualization}</div>
            <div>{children}</div>
            <div>{dsmContent}</div>
        </div>
    );
};

TempSearchSectionWrapper.propTypes = propTypes;
TempSearchSectionWrapper.defaultProps = defaultProps;

export default TempSearchSectionWrapper;
