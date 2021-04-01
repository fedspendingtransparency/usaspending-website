/**
 * LegalPage.jsx
 * Created by Kevin Li 2/21/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'data-transparency-ui';

import {
    accessibilityPageMetaTags,
    privacyPageMetaTags,
    foiaPageMetaTags
} from 'helpers/metaTagHelper';
import Footer from 'containers/Footer';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';

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
                <PageHeader title="Legal">
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
                </PageHeader>
            </div>
        );
    }
}

LegalPage.propTypes = propTypes;
