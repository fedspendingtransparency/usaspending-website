/**
 * LegalPage.jsx
 * Created by Kevin Li 2/21/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
    accessibilityPageMetaTags,
    privacyPageMetaTags,
    foiaPageMetaTags
} from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';

import LegalContent from './LegalContent';

require('pages/about/aboutPage.scss');

const propTypes = {
    activePage: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node
};

export default class LegalPage extends React.Component {
    render() {
        let metaTags = accessibilityPageMetaTags;
        if (this.props.activePage === 'privacy') {
            metaTags = privacyPageMetaTags;
        }
        else if (this.props.activePage === 'foia') {
            metaTags = foiaPageMetaTags;
        }
        return (
            <div className="usa-da-legal-page">
                <MetaTags {...metaTags} />
                <Header />
                <StickyHeader>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Legal
                        </h1>
                    </div>
                </StickyHeader>
                <main
                    id="main-content"
                    className="main-content">
                    <LegalContent
                        activePage={this.props.activePage}
                        title={this.props.title}>
                        {this.props.children}
                    </LegalContent>
                </main>
                <Footer />
            </div>
        );
    }
}

LegalPage.propTypes = propTypes;
