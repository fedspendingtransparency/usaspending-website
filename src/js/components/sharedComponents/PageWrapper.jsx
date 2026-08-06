 
/**
 * Page.jsx
 * Created by Max Kendall 04/23/2021
*/

import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'data-transparency-ui';

import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';
import Footer from 'containers/Footer';
import InPageNav from 'components/sharedComponents/InPageNav';
import { find } from "lodash-es";
import { combineQueryParams, getQueryParamString } from "../../helpers/queryParams";
import useQueryParams from "../../hooks/useQueryParams";
import IsMobileContext from "../../context/IsMobileContext";
import { stickyHeaderHeight } from "../../dataMapping/stickyHeader/stickyHeader";

const jumpToSectionLocal = (section = '', pageName, sections, query) => {
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

    return section;
};

const PageWrapper = ({
    pageName,
    classNames,
    metaTagProps = {},
    children,
    ref,
    noHeader = false,
    title,
    overLine,
    toolBarComponents = [],
    filters = {},
    spending_level = [],
    sections,
    // activeSection,
    jumpToSection = jumpToSectionLocal,
    backgroundColor = "#112F4E",
    rootMargin,
    inPageNav = false,
    loading
}) => {
    const query = useQueryParams();
    const { isMedium } = useContext(IsMobileContext);
    const [activeSection, setActiveSection] = useState(query.section || 'overview');

    useEffect(() => {
        // ("passed section", pageName="state", sections="stateSections")

        if (!loading && query.section) {
            setActiveSection(jumpToSection(query.section, pageName, `${pageName}Sections`));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.section, loading, isMedium]);

    return (
        <div className={classNames} ref={ref}>
            <MetaTags {...metaTagProps} />
            <Header />
            {noHeader ? null : <><PageHeader
                title={title}
                stickyBreakPoint={getStickyBreakPointForSidebar()}
                overLine={overLine}
                toolBar={toolBarComponents}
                pageName={pageName}
                backgroundColor={backgroundColor} />
            {sections && inPageNav && <InPageNav sections={sections} loading={loading} activeSection={activeSection} pageName={pageName} rootMargin={rootMargin} detectActiveSection jumpToSection={jumpToSection} />}
            </>}
            {React.cloneElement(children, {
                className: `usda-page__container${
                    children.props.className ?
                        ` ${children.props.className}` :
                        ''
                }`
            })}
            <Footer pageName={pageName} filters={filters} spending_level={spending_level} />
        </div>)
};

PageWrapper.propTypes = {
    pageName: PropTypes.string.isRequired,
    classNames: PropTypes.string,
    metaTagProps: PropTypes.object,
    toolBarComponents: PropTypes.arrayOf(PropTypes.element),
    title: PropTypes.string,
    overLine: PropTypes.string,
    children: PropTypes.element,
    ref: PropTypes.object,
    noHeader: PropTypes.bool,
    filters: PropTypes.object,
    sections: PropTypes.array,
    activeSection: PropTypes.string,
    jumpToSection: PropTypes.func,
    inPageNav: PropTypes.bool,
    backgroundColor: PropTypes.string,
    spending_level: PropTypes.array
};

export default PageWrapper;
