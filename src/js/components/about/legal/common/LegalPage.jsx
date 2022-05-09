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
import PageWrapper from 'components/sharedComponents/PageWrapper';

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
            <PageWrapper
                pageName="Legal"
                classNames="usa-da-legal-page"
                title="Legal"
                metaTagProps={metaTags}>
                <main
                    id="main-content"
                    className="main-content">
                    <LegalContent
                        activePage={this.props.activePage}
                        title={this.props.title}>
                        {this.props.children}
                    </LegalContent>
                </main>
            </PageWrapper>
        );
    }
}

LegalPage.propTypes = propTypes;
