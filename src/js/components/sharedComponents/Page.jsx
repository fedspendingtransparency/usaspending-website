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

const PageWrapper = ({
    classNames,
    metaTagProps = {},
    children,
    title,
    overline,
    toolBarComponents = []
}) => (
    <div className={classNames}>
        <MetaTags {...metaTagProps} />
        <Header />
        <PageHeader
            title={title}
            stickyBreakPoint={getStickyBreakPointForSidebar()}
            overLine={overline}
            toolBar={toolBarComponents} />
        {React.cloneElement(children, { classNames: 'usda-page__container' })}
        <Footer />
    </div>
);

PageWrapper.propTypes = {
    classNames: PropTypes.string,
    metaTagProps: PropTypes.object,
    toolBarComponents: PropTypes.arrayOf(PropTypes.elements),
    title: PropTypes.string.isRequired,
    overline: PropTypes.string,
    children: PropTypes.element
};

export default PageWrapper;
