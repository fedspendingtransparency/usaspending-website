/**
 * Covid19Container.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { snakeCase } from 'lodash';
import moment from 'moment';
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
import RedirectModalContainer from 'containers/redirectModal/RedirectModalContainer';
import { covidPageMetaTags } from 'helpers/metaTagHelper';
import { jumpToSection } from 'helpers/covid19Helper';
import { initialState as defaultAdvancedSearchFilters, CheckboxTreeSelections } from 'redux/reducers/search/searchFiltersReducer';
import { applyStagedFilters } from 'redux/actions/search/appliedFilterActions';
// import BaseOverview from 'models/v2/covid19/BaseOverview';
import {
    slug,
    getEmailSocialShareData,
    scrollPositionOfSiteHeader,
    footerTitle,
    footerDescription
} from 'dataMapping/covid19/covid19';
import { fetchDEFCodes, fetchAllSubmissionDates } from 'helpers/disasterHelper';
import { setDEFCodes, setLatestSubmissionDate } from 'redux/actions/covid19/covid19Actions';
import { showModal } from 'redux/actions/redirectModal/redirectModalActions';
import { updateDefCodes } from 'redux/actions/search/searchFilterActions';
import DataSourcesAndMethodology from 'components/covid19/DataSourcesAndMethodology';
import { componentByCovid19Section } from './helpers/covid19';
import DownloadButtonContainer from './DownloadButtonContainer';

require('pages/covid19/index.scss');

const Covid19Container = () => {
    const [activeSection, setActiveSection] = useState('overview');
    // const [selectedDEF, setselectedDEF] = useState('All');
    // const DEFOptions = getDEFOptions(setselectedDEF, defaultSortFy);
    const defCodesRequest = useRef(null);
    const allSubmissionDatesRequest = useRef(null);
    // const overviewRequest = useRef(null);
    const dispatch = useDispatch();
    const defCodes = useSelector((state) => state.covid19.defCodes);

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
    //             const newOverview = Object.create(BaseOverview);
    //              newOverview.populate(data);
    //             dispatch(setOverview(newOverview));
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
    const onFooterClick = () => {
        dispatch(updateDefCodes(defCodes.map((code) => code.code), [], [{ value: "COVID-19", count: defCodes.length, label: "COVID-19 Response" }]));
        dispatch(
            applyStagedFilters(
                Object.assign(
                    {}, defaultAdvancedSearchFilters,
                    {
                        defCodes: new CheckboxTreeSelections({
                            require: defCodes.map((code) => code.code),
                            exclude: [],
                            counts: [{ value: "COVID-19", count: defCodes.length, label: "COVID-19 Response" }]
                        })
                    }
                )
            )
        );
    };

    useEffect(() => {
        const getAllSubmissionDates = async () => {
            allSubmissionDatesRequest.current = fetchAllSubmissionDates();
            try {
                const data = await allSubmissionDatesRequest.current.promise;
                dispatch(setLatestSubmissionDate(data.data.available_periods
                    .filter((s) => !s.is_quarter)
                    .map((s) => moment(s.submission_due_date))
                    .sort((a, b) => b.valueOf() - a.valueOf())
                    .find((s) => Date.now() >= s.valueOf())
                    .format('MMM DD[,] YYYY')));
            }
            catch (e) {
                console.log(' Error Submission Periods : ', e.message);
            }
        };
        getAllSubmissionDates();
        allSubmissionDatesRequest.current = null;
        return () => {
            if (allSubmissionDatesRequest.current) {
                allSubmissionDatesRequest.cancel();
            }
        };
    }, []);

    const jumpToCovid19Section = (section) => jumpToSection(section, activeSection, setActiveSection);

    const handleExternalLinkClick = (url) => {
        dispatch(showModal(url));
    };

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
                            <DownloadButtonContainer />
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
                            .filter((section) => componentByCovid19Section()[section].showInMenu)
                            .map((section) => ({
                                section: snakeCase(section),
                                label: componentByCovid19Section()[section].title
                            }))} />
                </div>
                <div className="body usda__flex-col">
                    <section className="body__section">
                        <Heading />
                    </section>
                    {Object.keys(componentByCovid19Section())
                        .map((section) => (
                            <Covid19Section
                                key={section}
                                section={section}
                                icon={componentByCovid19Section()[section].icon}
                                headerText={componentByCovid19Section()[section].headerText}
                                title={componentByCovid19Section()[section].title}>
                                {componentByCovid19Section()[section].component}
                            </Covid19Section>
                        ))}
                    <section className="body__section">
                        <DataSourcesAndMethodology
                            handleExternalLinkClick={handleExternalLinkClick} />
                        <FooterLinkToAdvancedSearchContainer
                            title={footerTitle}
                            description={footerDescription}
                            onClick={onFooterClick} />
                    </section>
                </div>
                <RedirectModalContainer />
            </main>
            <Footer />
        </div>
    );
};

export default Covid19Container;
