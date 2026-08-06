/**
 * Covid19Page.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { find, throttle } from 'lodash-es';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { Helmet } from 'react-helmet';

import PageWrapper from 'components/sharedComponents/PageWrapper';
import Covid19Section from 'components/covid19/Covid19Section';
import Heading from 'components/covid19/Heading';
import BannerPageHeader from "components/sharedComponents/header/BannerPageHeader";
import { LoadingWrapper } from 'components/sharedComponents/Loading';
import InPageNav from 'components/sharedComponents/InPageNav';
import GlobalModalContainer from 'containers/globalModal/GlobalModalContainer';
import { handleShareOptionClick, getBaseUrl } from 'helpers/socialShare';
import { covidPageMetaTags } from 'helpers/metaTagHelper';
import { slug, getEmailSocialShareData } from 'dataMapping/covid19/covid19';
import { combineQueryParams, getQueryParamString } from 'helpers/queryParams';
import { showModal } from 'redux/actions/modal/modalActions';
import { componentByCovid19Section } from 'containers/covid19/helpers/covid19';
import Analytics from 'helpers/analytics/Analytics';
import useQueryParams from "../../hooks/useQueryParams";
import Covid19BottomSection from './Covid19BottomSection';

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
    const history = useNavigate();
    const [activeSection, setActiveSection] = useState(query.section || 'overview');
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
        history({
            path: `${getQueryParamString(newQueryParams)}`
        }, { replace: true });

        setActiveSection(section);

        // add offsets
        const sectionTop = sectionDom.offsetTop;
        let top = sectionTop + 380;

        // required to adjust offset for sections outside top Covid Sections FlexRow
        if (section === "data_sources_and_methodology" || section === "other_resources") {
            top = sectionTop - 75;
        }

        window.scrollTo({
            top,
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
        handleShareOptionClick(name, slug, getEmailSocialShareData, handleExternalLinkClick);
    };

    return (
        <PageWrapper
            pageName="covid19"
            classNames="usa-da-covid19-page"
            metaTagProps={covidPageMetaTags}
            title="COVID-19 Spending"
            noHeader >
            <LoadingWrapper isLoading={loading}>
                <Helmet>
                    <link href="https://api.mapbox.com/mapbox-gl-js/v2.11.1/mapbox-gl.css" rel="stylesheet" crossOrigin="anonymous" integrity="sha384-JnF4GvwrnLggHxx0ORCeHombtPxfqigY/GeEvbdv0Uy5qrCAuAyN3AulKRA+VAPr"/>
                </Helmet>

                <main id="main-content" className="main-content">
                    <BannerPageHeader
                        kicker="PROFILES"
                        title="Federal Response to COVID-19"
                        body="Learn about total spending and award spending in response to COVID-19"
                        faIcon="virus-covid"
                        primaryColor="#39215E"
                        secondaryColor="#783CB9" />
                    <InPageNav
                        sections={covid19Sections}
                        loading={loading}
                        activeSection={activeSection}
                        pageName="covid19"
                        detectActiveSection
                        jumpToSection={jumpToSection}
                        rootMargin={`-80px 0px 0px 0px`} />
                    <FlexGridRow className="body covid-content__row">
                        <FlexGridCol className="covid-content__col" width="fill">
                            <Heading publicLaw={query.publicLaw} url={getBaseUrl(slug)} onShareOptionClick={handleShare} />
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
                            <GlobalModalContainer />
                        </FlexGridCol>
                    </FlexGridRow>
                    <Covid19BottomSection
                        handleExternalLinkClick={handleExternalLinkClick} />
                </main>
            </LoadingWrapper>
        </PageWrapper>
    );
};

Covid19Page.propTypes = propTypes;
export default Covid19Page;
