/**
 * AboutPage.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { find, throttle } from 'lodash';
import { useQueryParams, combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from "helpers/stickyHeaderHelper";
import { aboutPageMetaTags } from 'helpers/metaTagHelper';

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

const AboutPage = () => {
    const history = useHistory();
    const query = useQueryParams();

    const [activeSection, setActiveSection] = useState(query.section || 'mission');

    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        if (!find(aboutSections, { section })) {
            return;
        }

        // find the section in dom
        const sectionDom = document.querySelector(`#about-${section}`);
        if (!sectionDom) return;

        // add section to url
        if (!window.location.href.includes(`section=${section}`)) {
            const newQueryParams = combineQueryParams(query, { section: `${section}` });
            history.replace({
                pathname: ``,
                search: getQueryParamString(newQueryParams)
            });
        }

        // update the state
        setActiveSection(section);

        // add offsets
        const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight + 40 : 10;
        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset);

        window.scrollTo({
            top: sectionTop - 25,
            left: 0,
            behavior: 'smooth'
        });
    };

    useEffect(throttle(() => {
        // this allows the page to jump to a section on page load, when
        // using a link to open the page
        // prevents a console error about react unmounted component leak
        let isMounted = true;
        if (isMounted) {
            const urlSection = query.section;
            if (urlSection) {
                jumpToSection(urlSection);
            }
        }
        return () => {
            isMounted = false;
        };
    }, 100), [history, query.section]);

    return (
        <PageWrapper
            pageName="about"
            classNames="usa-da-about-page"
            metaTagProps={aboutPageMetaTags}
            title="About"
            inPageNav
            sections={aboutSections}
            jumpToSection={jumpToSection}
            activeSection={activeSection}>
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
};

export default AboutPage;
