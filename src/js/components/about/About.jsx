/**
 * About.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React from 'react';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import { aboutPageMetaTags } from 'helpers/metaTagHelper';

import AboutPage from './AboutPage';

require('pages/about/aboutPage.scss');

const About = () => (
    <PageWrapper
        pageName="About"
        classNames="usa-da-about-page"
        metaTagProps={aboutPageMetaTags}
        title="About">
        <main id="main-content" className="main-content">
            <AboutPage />
        </main>
    </PageWrapper>
);

export default About;
