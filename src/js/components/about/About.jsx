/**
 * About.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React from 'react';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import { aboutPageMetaTags } from 'helpers/metaTagHelper';

import AboutContent from './AboutContent';

require('pages/about/aboutPage.scss');

export default class About extends React.Component {
    render() {
        return (
            <PageWrapper
                pageName="About"
                classNames="usa-da-about-page"
                metaTagProps={aboutPageMetaTags}
                title="About">
                <main id="main-content" className="main-content">
                    <AboutContent />
                </main>
            </PageWrapper>
        );
    }
}
