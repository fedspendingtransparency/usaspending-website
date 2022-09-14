
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryParams } from 'helpers/queryParams';
import { throttle } from 'lodash';
import { ComingSoon } from 'data-transparency-ui';
import { scrollToY } from 'helpers/scrollToHelper';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import InteractiveDataSourcesSection from './InteractiveDataSourcesSection';
import { interactiveDataSourcesPageMetaTags } from '../../helpers/metaTagHelper';
import Sidebar from '../sharedComponents/sidebar/Sidebar';
import AboutSection from './sections/AboutSection';
import IntroSection from './sections/IntroSection';
import FederalSpendingOverview from './scrollerSections/FederalSpendingOverview';

require('pages/interactiveDataSources/index.scss');

const scrollPositionOfSiteHeader = getStickyBreakPointForSidebar();
const InteractiveDataSourcesPage = () => {
    const [activeSection, setActiveSection] = useState('intro-section');
    const query = useQueryParams();
    const history = useHistory();
    const sections = [
        {
            name: 'intro-section',
            display: 'Introduction',
            showSectionTitle: false,
            scroller: false,
            component: <IntroSection />
        },
        {
            name: 'history-section',
            display: 'History of the DATA Act',
            showSectionTitle: false,
            scroller: false,
            component: <AboutSection />
        },
        {
            name: 'federal-spending-overview',
            display: 'Federal Spending Overview',
            showSectionTitle: false,
            scroller: true,
            component: <FederalSpendingOverview />
        }
    ];
    const jumpToSection = (section = '') => {
        // check if valid section
        const matchedSection = sections.find((obj) => obj.name === section);
        if (!matchedSection) return; // no matching section
        // scroll to correct section
        const sectionDom = document.querySelector(`#interactive-data-sources-${matchedSection.name}`);
        if (!sectionDom) return;
        if (activeSection === 'intro-section') {
            scrollToY(sectionDom.offsetTop - 150, 700);
        }
        else if (matchedSection.scroller) {
            // for scroller sections, add height
            scrollToY(sectionDom.offsetTop + 86, 700);
        }
        else {
            // scrollY set to the top of the section, subtracting the height of sticky elements + 20px of margin
            scrollToY(sectionDom.offsetTop - 86, 700);
        }
        setActiveSection(matchedSection.name);
    };
    useEffect(throttle(() => {
        // prevents a console error about react unmounted component leak
        let isMounted = true;
        if (isMounted) {
            const urlSection = query.section;
            if (urlSection) {
                // TODO: revisit settimeout
                setTimeout(() => {
                    jumpToSection(urlSection);
                    // remove the query param from the url after scrolling to the given section
                    history.replace(`/data-sources`);
                }, 1000);
            }
        }
        return () => {
            isMounted = false;
        };
    }, 100), [history, query.section]);
    return (
        <PageWrapper
            pageName="Data Sources"
            classNames="usa-da-interactive-data-sources-page"
            overLine="resources"
            metaTagProps={interactiveDataSourcesPageMetaTags}
            title="Data Sources">
            <main id="main-content" className="main-content usda__flex-row">
                <div className="sidebar usda__flex-col">
                    <Sidebar
                        pageName="interactive-data-sources"
                        fixedStickyBreakpoint={scrollPositionOfSiteHeader}
                        isGoingToBeSticky
                        active={activeSection}
                        jumpToSection={jumpToSection}
                        detectActiveSection={setActiveSection}
                        sections={sections.map((section) => ({
                            section: section.name,
                            label: section.display
                        }))} />
                </div>
                <div className="body usda__flex-col">
                    {sections.map((section) => (
                        <InteractiveDataSourcesSection
                            key={section.name}
                            section={section}
                            icon={section.icon}>
                            {section.component || <ComingSoon />}
                        </InteractiveDataSourcesSection>
                    ))}
                </div>
            </main>
        </PageWrapper>
    );
};
export default InteractiveDataSourcesPage;
