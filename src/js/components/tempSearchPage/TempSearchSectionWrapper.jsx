import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    sectionTitle: PropTypes.string,
    dropdownOptions: PropTypes.array,
    selectedDropdownOption: PropTypes.string,
    isVisualization: PropTypes.bool,
    children: PropTypes.string || PropTypes.element,
    dsmContent: PropTypes.string
};

const defaultProps = {
    sectionTitle: 'Section Title',
    dropdownOptions: ['Option 0', 'Option 1', 'Option 2'],
    selectedDropdownOption: 'Option 1',
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
    const tempText = 'hellow';

    return (
        <div>
            <div>{tempText}</div>
            <div>{sectionTitle}</div>
            <div>{dropdownOptions}</div>
            <div>{selectedDropdownOption}</div>
            <div>{isVisualization}</div>
            <div>{children}</div>
            <div>{dsmContent}</div>
        </div>
    );
};

TempSearchSectionWrapper.propTypes = propTypes;
TempSearchSectionWrapper.defaultProps = defaultProps;

export default TempSearchSectionWrapper;
