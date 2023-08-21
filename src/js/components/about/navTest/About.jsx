/**
 * About.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React, {useEffect, useState} from 'react';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import { aboutPageMetaTags } from 'helpers/metaTagHelper';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import { scrollToY } from 'helpers/scrollToHelper';
import { useQueryParams } from 'helpers/queryParams';
import { throttle } from "lodash";
import { useHistory } from "react-router-dom";

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


const About = () => {
    const query = useQueryParams();
    const [activeSection, setActiveSection] = useState(query.section || 'mission');
    const history = useHistory();

    const jumpToSection = (section = '') => {
        // if (!find(sections, { section })) { // not a known page section
        //     return;
        // }
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
        <PageWrapper
            pageName="About"
            classNames="usa-da-about-page"
            metaTagProps={aboutPageMetaTags}
            title="About">
            <InPageNav sections={aboutSections} jumpToSection={jumpToSection} />
            <main id="main-content" className="main-content">
                <AboutContent />
            </main>
        </PageWrapper>
    );
};

export default About;
