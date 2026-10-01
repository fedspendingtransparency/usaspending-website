import { useEffect, useCallback, useRef } from "react";
import { find } from "lodash-es";
import { useNavigate } from "react-router";

import { combineQueryParams, getQueryParamString } from "helpers/queryParams";
import { stickyHeaderHeight } from "dataMapping/stickyHeader/stickyHeader";
import useQueryParams from "./useQueryParams";

const useJumpToSection = (
    pageName,
    sections,
    loading = false,
    headerOffset = stickyHeaderHeight - 55
) => {
    const query = useQueryParams();
    const history = useNavigate();
    const queryRef = useRef(null);

    const jumpToSection = useCallback((section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const sectionObj = find(sections, ['section', section]);
        if (!sectionObj) return;

        // find the section in dom
        const sectionDom = document.querySelector(`${pageName}${sectionObj.section}`);
        if (!sectionDom) return;

        // add section to url
        const newQueryParams = combineQueryParams(query, { section: `${section}` });

        if (queryRef.current !== section) {
            history({
                search: `${getQueryParamString(newQueryParams)}`
            }, { replace: true });

            queryRef.current = section;
        }

        window.scrollTo({
            top: (sectionDom.offsetTop - headerOffset),
            left: 0,
            behavior: 'smooth'
        });

        return section;
    }, [history, query]);

    useEffect(() => {
        if (!loading && query.section) jumpToSection(query.section)
    }, [loading, query.section, jumpToSection]);

    return jumpToSection;
};

export default useJumpToSection;
