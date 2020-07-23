/**
 * Created by Marco Mendoza
 * 07/23/2020
 */ 

import React, { useState } from 'react';
import Cookies from 'js-cookie';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Covid19Section from 'components/covid19/Covid19Section';
import Footer from 'containers/Footer';
import { covidPageMetaTags } from 'helpers/metaTagHelper';
import { jumpToSection } from 'helpers/covid19Helper';
import { scrollPositionOfSiteHeader } from 'dataMapping/covid19/covid19';

const sections = [
    {
        section: 'test',
        title: 'This is a Test'
    },
    {
        section: 'test2',
        title: 'This is a Test 2'
    },
    {
        section: 'test3',
        title: 'This is a Test 3'
    },
    {
        section: 'test4',
        title: 'This is a Test 4'
    }
];

require('pages/covid19/index.scss');

export default () => {
    const [activeSection, setActiveSection] = useState('overview');
    const jumpToCovid19Section = (section) => jumpToSection(section, activeSection, setActiveSection);

    return (
        <div className="usa-da-covid19-page usa-da-covid-data">
            {/* TODO: Update these meta tags */}
            <MetaTags {...covidPageMetaTags} />
            <Header />
            <StickyHeader>
                <>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            Data Sources and Methodologies
                        </h1>
                    </div>
                </>
            </StickyHeader>
            <main id="main-content" className="main-content usda__flex-row">
                <div className="sidebar usda__flex-col">
                    <Sidebar
                        pageName="covid19"
                        fixedStickyBreakpoint={scrollPositionOfSiteHeader(Cookies.get('usaspending_covid_homepage'))}
                        active={activeSection}
                        jumpToSection={jumpToCovid19Section}
                        detectActiveSection={setActiveSection}
                        sections={sections} />
                </div>
                <div className="body usda__flex-col">
                    <div className="about-section-wrapper" id="about-mission">
                        <h2 className="about-section-title">Mission</h2>
                        <h3 className="about-subtitle">
                            Building a more transparent government.
                        </h3>
                        <div className="about-section-content">
                            <p>USAspending.gov is the official source for spending data for the U.S.
                                Government. Its mission is to show the American public what the federal
                                government spends every year and how it spends the money. You can follow
                                the money from the Congressional appropriations to the federal agencies
                                and down to local communities and businesses.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
