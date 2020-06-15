/**
 * Covid19Container.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { startCase, snakeCase } from 'lodash';
import Cookies from 'js-cookie';
import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'components/sharedComponents/header/Header';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import Covid19Section from 'components/covid19/Covid19Section';
import Footer from 'containers/Footer';
import Heading from 'components/covid19/Heading';
// import { Picker } from 'data-transparency-ui';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';
// import { defaultSortFy } from 'components/sharedComponents/pickers/FYPicker';
import FooterLinkToAdvancedSearchContainer from 'containers/shared/FooterLinkToAdvancedSearchContainer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { covidPageMetaTags } from 'helpers/metaTagHelper';
import { jumpToSection } from 'helpers/covid19Helper';
import {
    slug,
    getEmailSocialShareData,
    scrollPositionOfSiteHeader,
    footerTitle,
    footerDescription
} from 'dataMapping/covid19/covid19';
import { fetchDEFCodes } from 'helpers/disasterHelper';
import { setDEFCodes } from 'redux/actions/covid19/covid19Actions';
import { componentByCovid19Section } from './helpers/covid19';

require('pages/covid19/index.scss');

const Covid19Container = () => {
    const [activeSection, setActiveSection] = useState('overview');
    // const [selectedDEF, setselectedDEF] = useState('All');

    // const DEFOptions = getDEFOptions(setselectedDEF, defaultSortFy);
    const defCodesRequest = useRef(null);
    // const overviewRequest = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const getDefCodesData = async () => {
            defCodesRequest.current = fetchDEFCodes();
            try {
                const { data } = await defCodesRequest.current.promise;
                dispatch(setDEFCodes(data.codes.filter((c) => c.disaster === 'covid_19')));
            }
            catch (e) {
                console.log(' Error DefCodes : ', e.message);
            }
        };
        getDefCodesData();
        defCodesRequest.current = null;
        return () => {
            if (defCodesRequest.current) {
                defCodesRequest.cancel();
            }
        };
    }, []);

    // TODO - uncomment when API is implemented
    // useEffect(() => {
    //     const getOverviewData = async () => {
    //         overviewRequest.current = fetchOverview();
    //         try {
    //             const { data } = await overviewRequest.current.promise;
    //             const { spending, funding } = data;
    //             data.spending.otherObligations = spending.total_obligations - spending.award_obligations;
    //             data.spending.awardObligationsNotOutlayed = spending.award_obligations - spending.award_outlays;
    //             data.spending.remainingBalance = funding.total_budget_authority - spending.total_obligations;
    //             data.spending.nonAwardOutLays = spending.total_outlays - spending.award_outlays;
    //             data.spending.nonAwardNotOutlayed = data.spending.otherObligations - data.spending.nonAwardOutlays;
    //             dispatch(setOverview(data));
    //         }
    //         catch (e) {
    //             console.log(' Error Overview : ', e.message);
    //         }
    //     };
    //     getOverviewData();
    //     overviewRequest.current = null;
    //     return () => {
    //         if (overviewRequest.current) {
    //             overviewRequest.cancel();
    //         }
    //     };
    // }, []);

    const jumpToCovid19Section = (section) => jumpToSection(section, activeSection, setActiveSection);

    return (
        <div className="usa-da-covid19-page">
            <MetaTags {...covidPageMetaTags} />
            <Header />
            <StickyHeader>
                <>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            COVID-19 Response
                        </h1>
                    </div>
                    <div className="sticky-header__toolbar">
                        {/* <span className="fy-picker-label">Filter</span> */}
                        {/* <div className="fiscal-year-container">
                            <Picker
                                sortFn={defaultSortFy}
                                icon={<FontAwesomeIcon icon="tag" />}
                                selectedOption={`${selectedDEF}`}
                                options={DEFOptions} />
                            <span>DEF Codes</span>
                        </div> */}
                        {/* <hr /> */}
                        <ShareIcon
                            slug={slug}
                            email={getEmailSocialShareData} />
                        <div className="sticky-header__toolbar-item">
                            <button className="sticky-header__button">
                                <FontAwesomeIcon icon="download" />
                            </button>
                            <span>Download</span>
                        </div>
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
                        sections={Object.keys(componentByCovid19Section())
                            .map((section) => ({
                                section: snakeCase(section),
                                label: startCase(section)
                            }))} />
                </div>
                <div className="body usda__flex-col">
                    <section className="body__section">
                        <Heading />
                    </section>
                    {Object.keys(componentByCovid19Section()).map((section) => (
                        <Covid19Section
                            key={section}
                            section={section}
                            icon={componentByCovid19Section()[section].icon}
                            headerText={componentByCovid19Section()[section].headerText}>
                            {componentByCovid19Section()[section].component}
                        </Covid19Section>
                    ))}
                    <section className="body__section">
                        <FooterLinkToAdvancedSearchContainer
                            title={footerTitle}
                            description={footerDescription} />
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Covid19Container;
