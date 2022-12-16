/**
 * AboutContent.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { find, throttle } from 'lodash';
import { useQueryParams } from 'helpers/queryParams';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';

import Sidebar from '../sharedComponents/sidebar/Sidebar';

import Mission from './Mission';
import Background from './Background';
import MoreInfo from './MoreInfo';
import Contact from './Contact';
import Development from './Development';
import Careers from './Careers';
import Licensing from './Licensing';
import TrainingContent from "./TrainingContent";

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
        section: 'careers',
        label: 'Careers'
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
        section: 'training',
        label: 'Training'
    }
];

const AboutContent = () => {
    const history = useHistory();
    const query = useQueryParams();

    const [activeSection, setActiveSection] = useState(query.section || 'mission');

    const jumpToSection = (section = '') => {
        if (!find(aboutSections, { section })) { // not a known page section
            return;
        }
        const sectionDom = document.querySelector(`#about-${section}`);
        const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight : 10;
        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset);

        window.scrollTo({ top: sectionTop + 15, left: 0 });
        setActiveSection(section);
    };


    useEffect(throttle(() => {
        // prevents a console error about react unmounted component leak
        let isMounted = true;
        if (isMounted) {
            const urlSection = query.section;
            if (urlSection) {
                jumpToSection(urlSection);
                // remove the query param from the url after scrolling to the given section
                history.replace(`/about`);
            }
        }
        return () => {
            isMounted = false;
        };
    }, 100), [history, query.section]);

    return (
        <div className="about-content-wrapper">
            <div className="about-sidebar">
                <Sidebar
                    isGoingToBeSticky
                    active={activeSection}
                    pageName="about"
                    sections={aboutSections}
                    detectActiveSection={setActiveSection}
                    jumpToSection={jumpToSection}
                    fixedStickyBreakpoint={getStickyBreakPointForSidebar()} />
            </div>
            <div className="about-content">
                <div className="about-padded-content">
                    <Mission />
                    <Background />
                    <Development />
                    <Careers />
                    <Licensing />
                    <MoreInfo />
                    <Contact />
                    <TrainingContent />
                </div>
            </div>
        </div>
    );
};

export default AboutContent;
