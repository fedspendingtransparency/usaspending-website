/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'data-transparency-ui';

import { explorerPageMetaTags } from 'helpers/metaTagHelper';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';


import Footer from 'containers/Footer';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';


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

const ExplorerWrapperPage = (props) => {
    const handleShare = (name) => {
        handleShareOptionClick(name, slug, { subject: emailSubject });
    };

    return (
        <div className="usa-da-explorer-page">
            <MetaTags {...explorerPageMetaTags} />
            <Header />
            <PageHeader
                title="Spending Explorer"
                shareProps={{
                    url: getBaseUrl(slug),
                    onShareOptionClick: handleShare
                }}>
                <main
                    id="main-content"
                    className="main-content">
                    {props.children}
                </main>
                <Footer />
            </PageHeader>
        </div>
    );
};

ExplorerWrapperPage.propTypes = propTypes;
ExplorerWrapperPage.defaultProps = defaultProps;

export default ExplorerWrapperPage;
