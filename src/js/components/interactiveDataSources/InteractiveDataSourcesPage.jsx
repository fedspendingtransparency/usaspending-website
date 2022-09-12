
import React, { useState } from 'react';
import { ComingSoon } from 'data-transparency-ui';
import { scrollToY } from 'helpers/scrollToHelper';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import InteractiveDataSourcesSection from './InteractiveDataSourcesSection';
import { interactiveDataSourcesPageMetaTags } from '../../helpers/metaTagHelper';
import Sidebar from '../sharedComponents/sidebar/Sidebar';
import AboutSection from './sections/AboutSection';
import IntroSection from './sections/IntroSection';

require('pages/interactiveDataSources/index.scss');

const scrollPositionOfSiteHeader = getStickyBreakPointForSidebar();
const InteractiveDataSourcesPage = () => {
    const [activeSection, setActiveSection] = useState('intro-section');
    const sections = [
        {
            name: 'intro-section',
            display: 'USAspending Data Sources',
            showSectionTitle: false,
            component: <IntroSection />
        },
        {
            name: 'about-section',
            display: 'DATA Act and the Creation of USAspending',
            showSectionTitle: false,
            component: <AboutSection />
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
        else {
            // scrollY set to the top of the section, subtracting the height of sticky elements + 20px of margin
            scrollToY(sectionDom.offsetTop - 86, 700);
        }
        setActiveSection(matchedSection.name);
    };
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
