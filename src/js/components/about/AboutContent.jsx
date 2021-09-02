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

        setActiveSection(section);
        const sectionDom = document.querySelector(`#about-${section}`);
        if (!sectionDom) {
            return;
        }
        const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight : 10;
        const sectionTop = sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset;
        scrollToY(sectionTop, 700);
    };

    const dispatch = useDispatch();
    const onExternalLinkClick = (e) => {
        e.persist();
        if (e?.target) {
            dispatch(showModal(e.target.parentNode.getAttribute('data-href') || e.target.getAttribute('data-href') || e.target.value));
        }
    };

    useEffect(() => {
        const urlSection = query.section;
        if (urlSection) {
            jumpToSection(urlSection);
            // remove the query param from the url after scrolling to the given section
            history.replace(`/about`);
        }
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
