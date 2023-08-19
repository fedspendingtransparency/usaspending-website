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
import { scrollToY } from 'helpers/scrollToHelper';
import Sidebar from '../../sharedComponents/sidebar/Sidebar';

import Mission from '../Mission';
import Background from '../Background';
import MoreInfo from '../MoreInfo';
import Contact from '../Contact';
import Development from '../Development';
import Licensing from '../Licensing';
import InPageNav from "../../inPageNav/InPageNav";

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


const AboutContent = () => {
    const history = useHistory();
    const query = useQueryParams();

    const [activeSection, setActiveSection] = useState(query.section || 'mission');

    const jumpToSection = (section = '') => {
        if (!find(aboutSections, { section })) { // not a known page section
            return;
        }
        const sectionDom = document.querySelector(`#about-${section}`);
        if (!sectionDom) return;
        const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight : 10;
        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset);
        scrollToY(sectionTop + 15, 700);
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
            <div className="about-content">
                <div className="about-padded-content">
                    <InPageNav sections={aboutSections} />
                    <Mission />
                    <Background />
                    <Development />
                    <Licensing />
                    <MoreInfo />
                    <Contact />
                </div>
            </div>
        </div>
    );
};

export default AboutContent;
