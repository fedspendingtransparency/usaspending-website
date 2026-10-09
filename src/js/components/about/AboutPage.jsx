/**
 * AboutPage.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React, {memo} from 'react';

import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { aboutPageMetaTags } from 'helpers/metaTagHelper';
import useJumpToSection from "../../hooks/useJumpToSection";
import PageWrapper from "../sharedComponents/PageWrapper";
import Mission from './Mission';
import Background from './Background';
import MoreInfo from './MoreInfo';
import Contact from './Contact';
import Development from './Development';
import Licensing from './Licensing';

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
    }
];

// eslint-disable-next-line prefer-arrow-callback
const AboutPage = memo(function AboutPage () {
    // 60 px is the approx padding-top on the h2 elements
    const headerOffset = stickyHeaderHeight + 60;

    const jumpToSection = useJumpToSection("#about-", aboutSections, false, headerOffset);

    return (
        <PageWrapper
            pageName="about"
            classNames="usa-da-about-page"
            metaTagProps={aboutPageMetaTags}
            title="About"
            inPageNav
            sections={aboutSections}
            jumpToSection={jumpToSection}>
            <main id="main-content" className="main-content">
                <div className="about-content-wrapper">
                    <div className="about-content">
                        <div className="about-padded-content">
                            <Mission />
                            <Background />
                            <Development />
                            <Licensing />
                            <MoreInfo />
                            <Contact />
                        </div>
                    </div>
                </div>
            </main>
        </PageWrapper>
    );
});

export default AboutPage;
