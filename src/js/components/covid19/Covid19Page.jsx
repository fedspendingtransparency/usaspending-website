/**
 * Covid19Page.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { snakeCase } from 'lodash';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShareIcon } from 'data-transparency-ui';

import PageWrapper from 'components/sharedComponents/Page';
import Sidebar from 'components/sharedComponents/sidebar/Sidebar';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar, useDynamicStickyClass } from 'helpers/stickyHeaderHelper';
import Covid19Section from 'components/covid19/Covid19Section';
import Heading from 'components/covid19/Heading';
import { LoadingWrapper } from 'components/sharedComponents/Loading';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import LinkToAdvancedSearchContainer from 'containers/covid19/LinkToAdvancedSearchContainer';
import { covidPageMetaTags } from 'helpers/metaTagHelper';
import {
    jumpToSection,
    getStickyBreakPointForCovidBanner,
    getVerticalOffsetForSidebarFooter
} from 'helpers/covid19Helper';
import {
    slug,
    getEmailSocialShareData,
    dataDisclaimerHeight
} from 'dataMapping/covid19/covid19';
import { useQueryParams } from 'helpers/queryParams';
import { showModal } from 'redux/actions/modal/modalActions';
import DataSourcesAndMethodology from 'components/covid19/DataSourcesAndMethodology';
import OtherResources from 'components/covid19/OtherResources';
import Analytics from 'helpers/analytics/Analytics';
import { componentByCovid19Section } from 'containers/covid19/helpers/covid19';
import DownloadButtonContainer from 'containers/covid19/DownloadButtonContainer';
import SidebarFooter from 'components/covid19/SidebarFooter';
import PublicLawPicker from './PublicLawPicker';

require('pages/covid19/index.scss');

const propTypes = {
    areDefCodesLoading: PropTypes.bool
};

const Covid19Page = ({ areDefCodesLoading }) => {
    const query = useQueryParams();
    const history = useHistory();
    const [activeSection, setActiveSection] = useState('overview');
    const [dataDisclaimerBanner, setDataDisclaimerBanner] = useState(Cookies.get('usaspending_data_disclaimer'));
    const dataDisclaimerBannerRef = useRef(null);
    const dispatch = useDispatch();
    const { isRecipientMapLoaded } = useSelector((state) => state.covid19);
    const [isBannerSticky, , , setBannerStickyOnScroll] = useDynamicStickyClass(dataDisclaimerBannerRef, getStickyBreakPointForCovidBanner(Cookies.get('usaspending_covid_homepage')));

    const handleScroll = () => {
        setBannerStickyOnScroll();
    };

    const handleJumpToSection = (section) => {
        jumpToSection(section);
        setActiveSection(section);
        Analytics.event({ category: 'COVID-19 - Profile', action: `${section} - click` });
    };

    useEffect(() => {
        if (isRecipientMapLoaded && query.section) {
            handleJumpToSection(query.section);
            history.push({
                pathname: '/disaster/covid-19'
            });
        }
    }, [isRecipientMapLoaded]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleExternalLinkClick = (url) => {
        dispatch(showModal(url));
    };

    const handleCloseBanner = () => {
        Cookies.set('usaspending_data_disclaimer', 'hide', { expires: 7 });
        setDataDisclaimerBanner('hide');
    };

    return (
        <PageWrapper
            classNames="usa-da-covid19-page"
            metaTagProps={covidPageMetaTags}
            title="COVID-19 Spending"
            toolBarComponents={[
                <PublicLawPicker />,
                <ShareIcon
                    slug={slug}
                    email={getEmailSocialShareData} />,
                <DownloadButtonContainer />
            ]}>
            <LoadingWrapper isLoading={areDefCodesLoading}>
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
                                    active={activeSection}
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
                                        tooltipProps={componentByCovid19Section()[section].tooltipProps}
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
        </PageWrapper>
    );
};

Covid19Page.propTypes = propTypes;

export default Covid19Page;
