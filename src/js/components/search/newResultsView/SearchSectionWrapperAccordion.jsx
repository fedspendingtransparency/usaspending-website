import React, { useEffect, useState } from 'react';
import { throttle } from "lodash-es";
import { useLocation, useNavigate } from "react-router";
import PropTypes from "prop-types";

import Accordion from "../../sharedComponents/accordion/Accordion";
import {
    combineQueryParams, getQueryParamString, useQueryParams
} from "../../../helpers/queryParams";

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

    const query = useQueryParams();
    const history = useNavigate();
    const location = useLocation();
    const params = location.search?.split("&");

    params?.shift();

    // Measures content height to set height for dsm content
    const content = document.querySelector(`.search__${sectionName}`)?.clientHeight;
    const sectionValue = params?.length > 0 ? params[0]?.substring(8) : null;

    const jumpToSection = (section) => {
        const sections = ['map', 'time', 'categories', 'awards'];
        // we've been provided a section to jump to
        // check if it's a valid section
        const matchedSection = sections.find((sec) => sec === section);
        if (!matchedSection) {
            // no matching section
            return;
        }
        // find the section in dom
        const sectionDom = document.querySelector(`.${matchedSection}`);
        if (!sectionDom) {
            return;
        }
        // add section to url
        if (!window.location.href.includes(`section=${section}`)) {
            const newQueryParams = combineQueryParams(query, { section: `${section}` });
            history(getQueryParamString(newQueryParams));
        }

        let rectTopOffset = 0;
        if (matchedSection === 'categories') {
            rectTopOffset = 820;
        }
        else if (matchedSection === 'time') {
            rectTopOffset = 1680;
        }
        else if (matchedSection === 'map') {
            rectTopOffset = 2240;
        }

        if ((section && sectionValue) && section === sectionValue) {
            window.scrollTo({
                top: rectTopOffset,
                behavior: 'smooth'
            });
        }
    };

    const parseSection = () => {
        if (
            (params?.length === 1 || params?.length === 2) &&
            params[0].substring(0, 8) === "section=" && sectionValue
        ) {
            jumpToSection(sectionValue);
        }
    };

    useEffect(throttle(() => {
        setContentHeight(content);
        parseSection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 100), [content, sectionName]);

    return (
        <Accordion
            setOpen={setOpenAccordion}
            closedIcon="chevron-down"
            openIcon="chevron-up"
            title="Data sources and methodology" >
            {openAccordion ? (
                <div
                    className="search__section-wrapper-dsm"
                    style={{ height: `${contentHeight - 16}px` }}>
                    {dropdownOptions && selectedDropdownOption &&
                        dropdownOptions.find(
                            (obj) => obj.value === selectedDropdownOption)
                            .dsmContent}
                    { dsmContent || '' }
                </div>
            ) : (<></>)}
        </Accordion>
    );
};

SearchSectionWrapperAccordion.propTypes = propTypes;
export default SearchSectionWrapperAccordion;
