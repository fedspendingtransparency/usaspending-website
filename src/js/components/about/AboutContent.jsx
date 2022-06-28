/**
 * AboutContent.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { find } from 'lodash';
import { useDispatch } from 'react-redux';
import { showModal } from 'redux/actions/modal/modalActions';
import { scrollToY } from 'helpers/scrollToHelper';
import { useQueryParams } from 'helpers/queryParams';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';

import Sidebar from '../sharedComponents/sidebar/Sidebar';

import Mission from './Mission';
import Background from './Background';
import DataSources from './DataSources';
import DataQuality from './DataQuality';
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
        section: 'data-sources',
        label: 'Data Sources'
    },
    {
        section: 'data-quality',
        label: 'Data Quality'
    },
    {
        section: 'development',
        label: 'Development and Releases'
    },
    {
        section: 'training',
        label: 'Training'
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
    }
];

const AboutContent = () => {
    const location = useLocation();
    const history = useHistory();
    const query = useQueryParams();

    const [activeSection, setActiveSection] = useState(query.section || 'mission');

    const jumpToSection = (section = '') => {
        if (!find(aboutSections, { section })) { // not a known page section
            return;
        }

        const sectionDom = document.querySelector(`#about-${section}`);
        if (!sectionDom) {
            return;
        }
        const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight : 10;
        const sectionTop = sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset;
        console.debug(window.innerWidth, window.innerHeight);
        if (window.innerWidth >= 993 && window.innerWidth <= 1000) {
            scrollToY(sectionTop + 10, 750);
        } else if (window.innerWidth > 1000 && window.innerWidth <= 1100) {
            scrollToY(sectionTop + 24, 750);
        } else if (window.innerWidth > 1100 && window.innerWidth <= 1200) {
            scrollToY(sectionTop - 275, 750);
        } else if (window.innerWidth > 1200 && window.innerWidth <= 1300) {
            scrollToY(sectionTop - 175, 750);
        } else if (window.innerWidth > 1300 && window.innerWidth <= 1400) {
            scrollToY(sectionTop - 160, 750);
        } else if (window.innerWidth > 1400 && window.innerWidth <= 1500) {
            scrollToY(sectionTop + 35, 750);
        } else {
            scrollToY(sectionTop + 175, 750);
        }
        setActiveSection(section);
    };

    const dispatch = useDispatch();
    const onExternalLinkClick = (e) => {
        e.persist();
        if (e?.target) {
            dispatch(showModal(e.target.parentNode.getAttribute('data-href') || e.target.getAttribute('data-href') || e.target.value));
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        history.scrollRestoration = 'manual';
        let isMounted = true;
        if (isMounted) {
            const urlSection = query.section;
            if (urlSection) {
                jumpToSection(urlSection);
                // remove the query param from the url after scrolling to the given section
                history.replace(`/about`);
            }
        }
        return () => { isMounted = false; };
    }, [history, location.search, query.section]);

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
                    <DataSources onExternalLinkClick={onExternalLinkClick} />
                    <DataQuality onExternalLinkClick={onExternalLinkClick} />
                    <Development />
                    <TrainingContent />
                    <Careers />
                    <Licensing />
                    <MoreInfo />
                    <Contact />
                </div>
            </div>
        </div>
    );
};

export default AboutContent;
