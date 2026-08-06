import { combineQueryParams, getQueryParamString } from "helpers/queryParams";
import { stickyHeaderHeight } from "dataMapping/stickyHeader/stickyHeader";
import useQueryParams from "./useQueryParams";

// ("passed section", pageName="state", sections="stateSections")
const useJumpToSection = (section = '', pageName, top, sections) => {
    const query = useQueryParams();

    // we've been provided a section to jump to
    // check if it's a valid section
    const sectionObj = find(sections, ['section', section]);
    if (!sectionObj) return;

    // find the section in dom
    const sectionDom = document.querySelector(`#${pageName}-${sectionObj.section}`);
    if (!sectionDom) return;

    // add section to url
    const newQueryParams = combineQueryParams(query, { section: `${section}` });
    history({
        path: `${getQueryParamString(newQueryParams)}`
    }, { replace: true });

    const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight);

    window.scrollTo({
        top: sectionTop - 55,
        left: 0,
        behavior: 'smooth'
    });

    return(section);
};

export default useJumpToSection;
