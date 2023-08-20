/**
 * About.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React from 'react';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import { aboutPageMetaTags } from 'helpers/metaTagHelper';

import AboutContent from './AboutContent';
import InPageNav from "../../inPageNav/InPageNav";

require('pages/about/aboutPage.scss');

const aboutSections = [
    {
        section: 'mission',
        label: 'Mission'
    },
    {
        section: 'background',
        label: 'Background'
    },
    {
        section: 'development',
        label: 'Development and Releases'
    },
    {
        section: 'licensing',
        label: 'Licensing'
    },
    {
        section: 'more-info',
        label: 'More Information'
    },
    {
        section: 'contact',
        label: 'Contact'
    },
    {
        section: 'mission2',
        label: 'Mission2'
    },
    {
        section: 'background2',
        label: 'Background2'
    },
    {
        section: 'development2',
        label: 'Development and Releases2'
    },
    {
        section: 'licensing2',
        label: 'Licensing2'
    },
    {
        section: 'more-info2',
        label: 'More Information2'
    },
    {
        section: 'contact2',
        label: 'Contact2'
    },
    {
        section: 'mission3',
        label: 'Mission3'
    },
    {
        section: 'background3',
        label: 'Background3'
    },
    {
        section: 'development3',
        label: 'Development and Releases3'
    },
    {
        section: 'licensing3',
        label: 'Licensing3'
    },
    {
        section: 'more-info3',
        label: 'More Information3'
    },
    {
        section: 'contact3',
        label: 'Contact3'
    }
];


const About = () => (
    <PageWrapper
        pageName="About"
        classNames="usa-da-about-page"
        metaTagProps={aboutPageMetaTags}
        title="About">
            <InPageNav sections={aboutSections} />
            <main id="main-content" className="main-content">
                <AboutContent />
            </main>
    </PageWrapper>
);

export default About;
