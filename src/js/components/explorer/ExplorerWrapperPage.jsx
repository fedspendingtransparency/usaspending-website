/**
 * ExplorerLanding.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { explorerPageMetaTags } from 'helpers/metaTagHelper';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Footer from 'components/sharedComponents/Footer';

const propTypes = {
    children: PropTypes.element
};

const ExplorerWrapperPage = (props) => (
    <div className="usa-da-explorer-page">
        <MetaTags {...explorerPageMetaTags} />
        <Header />
        <div className="page-title-bar">
            <div className="page-title-bar-wrap">
                <h1 className="page-title">
                    Spending Explorer
                </h1>
            </div>
        </div>
        <main
            id="main-content"
            className="main-content">
            {props.children}
        </main>
        <Footer />
    </div>
);

ExplorerWrapperPage.propTypes = propTypes;

export default ExplorerWrapperPage;
