/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { explorerPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl } from 'helpers/socialShare';

import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';
import Header from 'containers/shared/HeaderContainer';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';


const propTypes = {
    children: PropTypes.element,
    showShareIcon: PropTypes.bool
};

const defaultProps = {
    showShareIcon: false
};

require('pages/explorer/explorerPage.scss');

const slug = 'explorer';
const emailSubject = 'USAspending.gov Federal Spending Explorer';

const ExplorerWrapperPage = (props) => (
    <div className="usa-da-explorer-page">
        <MetaTags {...explorerPageMetaTags} />
        <Header />
        <StickyHeader>
            <div className="sticky-header__title">
                <h1 tabIndex={-1} id="main-focus">
                    Spending Explorer
                </h1>
            </div>
            <div className="sticky-header__toolbar">
                {props.showShareIcon &&
                <ShareIcon
                    slug={slug}
                    email={{
                        subject: emailSubject,
                        body: `View the Spending Explorer on USAspending.gov: ${getBaseUrl(slug)}`
                    }} />
                }
            </div>
        </StickyHeader>
        <main
            id="main-content"
            className="main-content">
            {props.children}
        </main>
        <Footer />
    </div>
);

ExplorerWrapperPage.propTypes = propTypes;
ExplorerWrapperPage.defaultProps = defaultProps;

export default ExplorerWrapperPage;
