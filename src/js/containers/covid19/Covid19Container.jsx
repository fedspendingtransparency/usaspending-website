/**
 * Covid19Container.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { snakeCase, isEqual } from 'lodash';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import MetaTags from 'components/sharedComponents/metaTags/MetaTags';
import Header from 'containers/shared/HeaderContainer';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import StickyHeader, { useDynamicStickyClass } from 'components/sharedComponents/stickyHeader/StickyHeader';
import Covid19Section from 'components/covid19/Covid19Section';
import Footer from 'containers/Footer';
import Heading from 'components/covid19/Heading';
import { LoadingWrapper } from 'components/sharedComponents/Loading';
// import { Picker } from 'data-transparency-ui';
import ShareIcon from 'components/sharedComponents/stickyHeader/ShareIcon';
// import { defaultSortFy } from 'components/sharedComponents/pickers/FYPicker';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import LinkToAdvancedSearchContainer from 'containers/covid19/LinkToAdvancedSearchContainer';
import { covidPageMetaTags } from 'helpers/metaTagHelper';
import BaseOverview from 'models/v2/covid19/BaseOverview';
import {
    jumpToSection,
    getStickyBreakPointForSidebar,
    getStickyBreakPointForCovidBanner,
    getVerticalOffsetForSidebarFooter
} from 'helpers/covid19Helper';
import {
    slug,
    getEmailSocialShareData,
    stickyHeaderHeight,
    dataDisclaimerHeight
} from 'dataMapping/covid19/covid19';
import {
    fetchDEFCodes,
    fetchOverview,
    fetchAwardAmounts
} from 'helpers/disasterHelper';
import { getLatestPeriodAsMoment, fetchAllSubmissionDates } from 'helpers/accountHelper';
import { setDEFCodes, setOverview, setTotals } from 'redux/actions/covid19/covid19Actions';
import { setAccountDataAsOfDate as setLatestSubmissionDate } from 'redux/actions/account/accountActions';
import { showModal } from 'redux/actions/modal/modalActions';
import DataSourcesAndMethodology from 'components/covid19/DataSourcesAndMethodology';
import OtherResources from 'components/covid19/OtherResources';
import Analytics from 'helpers/analytics/Analytics';
import { componentByCovid19Section } from './helpers/covid19';
import DownloadButtonContainer from './DownloadButtonContainer';
import SidebarFooter from '../../components/covid19/SidebarFooter';

require('pages/covid19/index.scss');

const Covid19Container = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataDisclaimerBanner, setDataDisclaimerBanner] = useState(Cookies.get('usaspending_data_disclaimer'));
    // const [selectedDEF, setselectedDEF] = useState('All');
    // const DEFOptions = getDEFOptions(setselectedDEF, defaultSortFy);
    const defCodesRequest = useRef(null);
    const overviewRequest = useRef(null);
    const lastSectionRef = useRef(null);
    const awardAmountRequest = useRef(null);
    const dataDisclaimerBannerRef = useRef(null);
    const allSubmissionDatesRequest = useRef(null);
    const dispatch = useDispatch();
    const defCodes = useSelector((state) => state.covid19.defCodes, isEqual);
    const [isBannerSticky, , , setBannerStickyOnScroll] = useDynamicStickyClass(dataDisclaimerBannerRef, getStickyBreakPointForCovidBanner(Cookies.get('usaspending_covid_homepage')));

    useEffect(() => () => {
        if (defCodesRequest.current) {
            defCodesRequest.cancel();
        }
    }, []);

    const handleScroll = () => {
        setBannerStickyOnScroll();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    useEffect(() => {
        if (defCodes.length === 0) {
            const getDefCodesData = async () => {
                defCodesRequest.current = fetchDEFCodes();
                try {
                    const { data } = await defCodesRequest.current.promise;
                    dispatch(setDEFCodes(data.codes.filter((c) => c.disaster === 'covid_19')));
                    setIsLoading(false);
                }
                catch (e) {
                    console.log(' Error DefCodes : ', e.message);
                }
            };
            getDefCodesData();
            defCodesRequest.current = null;
        }
        else {
            setIsLoading(false);
        }
    }, [defCodes, dispatch]);

    useEffect(() => {
        const getOverviewData = async () => {
            overviewRequest.current = fetchOverview(defCodes.map((code) => code.code));
            try {
                const { data } = await overviewRequest.current.promise;
                const newOverview = Object.create(BaseOverview);
                newOverview.populate(data);
                dispatch(setOverview(newOverview));
            }
            catch (e) {
                console.log(' Error Overview : ', e.message);
            }
        };
        const getAllAwardTypesAmount = async () => {
            const params = {
                filter: {
                    def_codes: defCodes.map((code) => code.code)
                }
            };
            awardAmountRequest.current = fetchAwardAmounts(params);
            try {
                const { data } = await awardAmountRequest.current.promise;
                // set totals in redux, we can use totals elsewhere to calculate unlinked data
                const totals = {
                    obligation: data.obligation,
                    outlay: data.outlay,
                    awardCount: data.award_count,
                    faceValueOfLoan: data.face_value_of_loan
                };
                dispatch(setTotals('', totals));
            }
            catch (e) {
                console.log(' Error Amounts : ', e.message);
            }
        };
        if (defCodes.length) {
            getOverviewData();
            getAllAwardTypesAmount();
            overviewRequest.current = null;
            awardAmountRequest.current = null;
        }
        return () => {
            if (overviewRequest.current) {
                overviewRequest.cancel();
            }
            if (awardAmountRequest.current) {
                awardAmountRequest.cancel();
            }
        };
    }, [defCodes, dispatch]);

    useEffect(() => {
        const getAllSubmissionDates = async () => {
            allSubmissionDatesRequest.current = fetchAllSubmissionDates();
            try {
                const data = await allSubmissionDatesRequest.current.promise;
                dispatch(setLatestSubmissionDate(getLatestPeriodAsMoment(data.data.available_periods)));
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

    const handleExternalLinkClick = (url) => {
        dispatch(showModal(url));
    };

    const handleCloseBanner = () => {
        Cookies.set('usaspending_data_disclaimer', 'hide', { expires: 7 });
        setDataDisclaimerBanner('hide');
    };

    const handleJumpToSection = (section) => {
        jumpToSection(section);
        Analytics.event({ category: 'COVID-19 - Profile', action: `${section} - click` });
    };

    return (
        <div className="usa-da-covid19-page" ref={dataDisclaimerBannerRef}>
            <MetaTags {...covidPageMetaTags} />
            <Header />
            <StickyHeader>
                <>
                    <div className="sticky-header__title">
                        <h1 tabIndex={-1} id="main-focus">
                            COVID-19 Spending
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
            <LoadingWrapper isLoading={isLoading}>
                <>
                    {dataDisclaimerBanner !== 'hide' && (
                        <div className={`info-banner data-disclaimer${isBannerSticky ? ' sticky-banner' : ''}`}>
                            <div className="info-top" />
                            <div className="info-banner__content">
                                <div className="info-banner__content--title">
                                    <FontAwesomeIcon size="lg" icon="exclamation-triangle" color="#FDB81E" />
                                    <h2>Known Data Limitations</h2>
                                    <FontAwesomeIcon onClick={handleCloseBanner} size="lg" icon="times" color="black" />
                                </div>
                                <p>
                                    USAspending is working with federal agencies to address known limitations in COVID-19 spending data. See <a target="_blank" href="data/data-limitations.pdf" rel="noopener noreferrer">a full description</a> of this issue.
                                </p>
                            </div>
                        </div>
                    )}
                    <main id="main-content" className="main-content usda__flex-row">
                        <div className="sidebar">
                            <div className={`sidebar__content${!dataDisclaimerBanner ? ' covid-banner' : ''}`}>
                                <Sidebar
                                    pageName="covid19"
                                    isGoingToBeSticky
                                    fixedStickyBreakpoint={getStickyBreakPointForSidebar()}
                                    jumpToSection={handleJumpToSection}
                                    detectActiveSection
                                    verticalSectionOffset={dataDisclaimerBanner === 'hide'
                                        ? stickyHeaderHeight
                                        : stickyHeaderHeight + dataDisclaimerHeight}
                                    sections={Object.keys(componentByCovid19Section())
                                        .filter((section) => componentByCovid19Section()[section].showInMenu)
                                        .map((section) => ({
                                            section: snakeCase(section),
                                            label: componentByCovid19Section()[section].title
                                        }))} >
                                    <div className="sidebar-footer">
                                        <SidebarFooter
                                            pageName="covid19"
                                            isGoingToBeSticky
                                            verticalOffset={getVerticalOffsetForSidebarFooter()}
                                            fixedStickyBreakpoint={getStickyBreakPointForSidebar()} />
                                    </div>
                                </Sidebar>
                            </div>
                        </div>
                        <div className="body usda__flex-col">
                            <section className="body__section">
                                <Heading />
                            </section>
                            {Object.keys(componentByCovid19Section())
                                .filter((section) => componentByCovid19Section()[section].showInMainSection)
                                .map((section) => (
                                    <Covid19Section
                                        key={section}
                                        section={section}
                                        icon={componentByCovid19Section()[section].icon}
                                        headerText={componentByCovid19Section()[section].headerText}
                                        title={componentByCovid19Section()[section].title}
                                        tooltip={componentByCovid19Section()[section].tooltip}>
                                        {componentByCovid19Section()[section].component}
                                    </Covid19Section>
                                ))}
                            <section className="body__section" id="covid19-data_sources_and_methodology">
                                <DataSourcesAndMethodology
                                    handleExternalLinkClick={handleExternalLinkClick} />
                            </section>
                            <section className="body__section" id="covid19-other_resources">
                                <OtherResources
                                    handleExternalLinkClick={handleExternalLinkClick} />
                                <LinkToAdvancedSearchContainer />
                            </section>
                        </div>
                        <GlobalModalContainer />
                    </main>
                </>
            </LoadingWrapper>
            <div className="footer-reference" ref={lastSectionRef}>
                <Footer />
            </div>
        </div>
    );
};

export default Covid19Container;
