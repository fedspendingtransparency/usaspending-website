/**
 * Page.jsx
 * Created by Max Kendall 04/23/2021
*/

import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'data-transparency-ui';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';
import Footer from 'containers/Footer';
import InPageNav from "../inPageNav/InPageNav";

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
    sections,
    jumpToSection
}) => (
    <div className={classNames} ref={ref}>
        <MetaTags {...metaTagProps} />
        <Header />
        {noHeader ? null : <><PageHeader
            title={title}
            stickyBreakPoint={getStickyBreakPointForSidebar()}
            overLine={overLine}
            toolBar={toolBarComponents} />
        {sections && <InPageNav sections={sections} jumpToSection={jumpToSection} />}
        </>}
        <div className={`usda-page__container${children?.props?.className ? ` ${children?.props?.className}` : ''}`}>{children}</div>
        <Footer pageName={pageName} filters={filters} />
    </div>
);

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
    jumpToSection: PropTypes.func
};

export default PageWrapper;
