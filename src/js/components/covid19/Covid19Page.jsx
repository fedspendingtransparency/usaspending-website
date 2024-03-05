/**
 * Covid19Page.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { find, throttle } from 'lodash';
import { ShareIcon } from 'data-transparency-ui';
import { Helmet } from 'react-helmet';
import PageWrapper from 'components/sharedComponents/PageWrapper';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import { getStickyBreakPointForSidebar } from 'helpers/stickyHeaderHelper';
import Covid19Section from 'components/covid19/Covid19Section';
import Heading from 'components/covid19/Heading';
import { LoadingWrapper } from 'components/sharedComponents/Loading';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import LinkToAdvancedSearchContainer from 'containers/covid19/LinkToAdvancedSearchContainer';
import { handleShareOptionClick, getBaseUrl } from 'helpers/socialShare';
import { covidPageMetaTags } from 'helpers/metaTagHelper';
import { slug, getEmailSocialShareData } from 'dataMapping/covid19/covid19';
import { useQueryParams, combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import { showModal } from 'redux/actions/modal/modalActions';
import DataSourcesAndMethodology from 'components/covid19/DataSourcesAndMethodology';
import OtherResources from 'components/covid19/OtherResources';
import { componentByCovid19Section } from 'containers/covid19/helpers/covid19';
import DownloadButtonContainer from 'containers/covid19/DownloadButtonContainer';
import Analytics from 'helpers/analytics/Analytics';

require('pages/covid19/index.scss');

const propTypes = {
    loading: PropTypes.bool
};
const covid19Sections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'total_spending_by_budget_categories',
        label: 'Total Spending by Budget Category'
    },
    {
        section: 'award_spending_by_recipient',
        label: 'Award Spending by Recipient'
    },
    {
        section: 'award_spending_by_agency',
        label: 'Award Spending by Sub-Agency'
    },
    {
        section: 'award_spending_by_assistance_listing',
        label: 'Award Spending by Assistance Listing'
    },
    {
        section: 'data_sources_and_methodology',
        label: 'Data Sources & Methodology'
    },
    {
        section: 'other_resources',
        label: 'Other Resources'
    }
];

const Covid19Page = ({ loading }) => {
    const query = useQueryParams();
    const history = useHistory();
    const [activeSection, setActiveSection] = useState(query.section || 'overview');
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const dispatch = useDispatch();
    const { isRecipientMapLoaded } = useSelector((state) => state.covid19);


    const jumpToSection = (section = '') => {
        // we've been provided a section to jump to
        // check if it's a valid section
        const sectionObj = find(covid19Sections, ['section', section]);
        if (!sectionObj) return;

        // find the section in dom
        const sectionDom = document.querySelector(`#covid19-${sectionObj.section}`);
        if (!sectionDom) return;

        // add section to url
        const newQueryParams = combineQueryParams(query, { section: `${section}` });
        history.replace({
            pathname: ``,
            search: getQueryParamString(newQueryParams)
        });
        setActiveSection(section);

        // add offsets
        const conditionalOffset = window.scrollY < getStickyBreakPointForSidebar() ? stickyHeaderHeight + 40 : 10;
        const sectionTop = (sectionDom.offsetTop - stickyHeaderHeight - conditionalOffset);

        window.scrollTo({
            top: sectionTop - 25,
            left: 0,
            behavior: 'smooth'
        });
        Analytics.event({ event: 'covid_profile', category: 'COVID-19 - Profile', action: `${section} - click` });
    };

    useEffect(() => {
        if (isRecipientMapLoaded && query.section) {
            jumpToSection(query.section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecipientMapLoaded, query.section]);

    useEffect(throttle(() => {
        // prevents a console error about react unmounted component leak
        let isMounted = true;
        if (isMounted) {
            const urlSection = query.section;
            if (urlSection) {
                setActiveSection(urlSection);
                jumpToSection(urlSection);
            }
        }
        return () => {
            isMounted = false;
        };
    }, 100), [history, query.section]);

    const handleExternalLinkClick = (url) => {
        dispatch(showModal(url));
    };

    const handleShare = (name) => {
        handleShareOptionClick(name, slug, getEmailSocialShareData);
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    return (
        <PageWrapper
            pageName="covid19"
            classNames="usa-da-covid19-page"
            metaTagProps={covidPageMetaTags}
            title="COVID-19 Spending"
            toolBarComponents={[
                <ShareIcon
                    url={getBaseUrl(slug)}
                    onShareOptionClick={handleShare}
                    classNames={!isMobile ? "margin-right" : ""} />,
                <DownloadButtonContainer />
            ]}
            sections={covid19Sections}
            activeSection={activeSection}
            jumpToSection={jumpToSection}
            inPageNav>
            <LoadingWrapper isLoading={loading}>
                <Helmet>
                    <link href="https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css" rel="stylesheet" />
                </Helmet>
                <main id="main-content" className="main-content usda__flex-row">
                    <div className="body usda__flex-col">
                        <section className="body__section">
                            <Heading publicLaw={query.publicLaw} />
                        </section>
                        {Object.keys(componentByCovid19Section())
                            .filter((section) => componentByCovid19Section()[section].showInMainSection)
                            .map((section) => (
                                <Covid19Section
                                    key={section}
                                    section={section}
                                    publicLaw={query.publicLaw}
                                    icon={componentByCovid19Section()[section].icon}
                                    headerText={componentByCovid19Section()[section].headerText}
                                    title={componentByCovid19Section()[section].title}
                                    tooltipProps={componentByCovid19Section()[section].tooltipProps}
                                    tooltip={componentByCovid19Section()[section].tooltip}>
                                    {componentByCovid19Section(query.publicLaw, handleExternalLinkClick)[section].component}
                                </Covid19Section>
                            ))}
                        <section className="body__section" id="covid19-data_sources_and_methodology">
                            <DataSourcesAndMethodology
                                handleExternalLinkClick={handleExternalLinkClick}
                                publicLaw={query.publicLaw} />
                        </section>
                        <section className="body__section" id="covid19-other_resources">
                            <OtherResources
                                handleExternalLinkClick={handleExternalLinkClick}
                                publicLaw={query.publicLaw} />
                            <LinkToAdvancedSearchContainer />
                        </section>
                    </div>
                    <GlobalModalContainer />
                </main>
            </LoadingWrapper>
        </PageWrapper>
    );
};

Covid19Page.propTypes = propTypes;
export default Covid19Page;
