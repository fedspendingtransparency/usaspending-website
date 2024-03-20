/**
 * TempSearchSectionWrapper.jsx
 * Created by Josue Aguilar 3/19/2024
 */

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import NewPicker from "../sharedComponents/dropdowns/NewPicker";
import Accordion from "../sharedComponents/accordion/Accordion";

const propTypes = {
    sectionTitle: PropTypes.string,
    dropdownOptions: PropTypes.array,
    selectedDropdownOption: PropTypes.number,
    isVisualization: PropTypes.bool,
    children: PropTypes.string || PropTypes.element,
    dsmContent: PropTypes.string
};

const defaultProps = {
    sectionTitle: 'Section Title',
    dropdownOptions: [
        {
            name: 'Option 0',
            value: 0
        },
        {
            name: 'Option 1',
            value: 1
        },
        {
            name: 'Option 2',
            value: 2
        }
    ],
    selectedDropdownOption: 0,
    isVisualization: true,
    children: 'children',
    dsmContent: 'dsmContent'
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
    const [open, setOpen] = useState(false);

    const onClick = (e) => {
        setSelectedDropdown(e);
    };
    const sortFn = () => dropdownOptions;

    useEffect(() => {
        dropdownOptions.forEach((opt) => {
            opt.onClick = onClick;
        });
    }, [dropdownOptions]);

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
            <Accordion
                setOpen={setOpen}
                closedIcon="chevron-down"
                openIcon="chevron-up"
                title="Data sources and methodology" />
            {open && <div>{dsmContent}</div>}
        </div>
    );
};

TempSearchSectionWrapper.propTypes = propTypes;
TempSearchSectionWrapper.defaultProps = defaultProps;

export default TempSearchSectionWrapper;
