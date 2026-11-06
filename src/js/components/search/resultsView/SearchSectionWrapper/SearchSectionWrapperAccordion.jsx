import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Accordion from '../../../sharedComponents/accordion/Accordion';

const propTypes = {
    openAccordion: PropTypes.bool,
    setOpenAccordion: PropTypes.func,
    dropdownOptions: PropTypes.array,
    selectedDropdownOption: PropTypes.string,
    dsmContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sectionName: PropTypes.string
};

const SearchSectionWrapperAccordion = ({
    openAccordion,
    setOpenAccordion,
    dropdownOptions,
    selectedDropdownOption,
    dsmContent,
    sectionName
}) => {
    const [contentHeight, setContentHeight] = useState(
        document.querySelector('.search__section-wrapper-content')?.clientHeight
    );

    // Measures content height to set height for dsm content
    const content = document.querySelector(`.search__${sectionName}`)?.clientHeight;

    useLayoutEffect(() => {
        // content is a DOM layout measurement only known after paint, so it can't
        // be computed during render - this setState is syncing to that external value.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setContentHeight(content);
    }, [content]);

    return (
        <Accordion
            open={openAccordion}
            setOpen={setOpenAccordion}
            closedIcon="chevron-down"
            openIcon="chevron-up"
            title="Data sources and methodology">
            {openAccordion ?
                (
                    <div
                        className="search__section-wrapper-dsm"
                        style={{ height: `${contentHeight - 16}px` }}>
                        {dropdownOptions && selectedDropdownOption &&
                            dropdownOptions.find(
                                (obj) => obj.value === selectedDropdownOption)
                                .dsmContent}
                        { dsmContent || '' }
                    </div>
                ) :
                (<></>)}
        </Accordion>
    );
};

SearchSectionWrapperAccordion.propTypes = propTypes;
export default SearchSectionWrapperAccordion;
