/**
 * NLSearchInfoPage.jsx
 * Created by Trey Morgan 09/24/2026
 */

import React, { useState, useCallback } from 'react';
import PageWrapper from '../../sharedComponents/PageWrapper';
import SideBarNav from '../../sharedComponents/SideBarNav';
import BannerPageHeader from '../../sharedComponents/header/BannerPageHeader';
import { smartAssistPageMetaTags } from '../../../helpers/metaTagHelper';
import smartAssistGraphic from '../../../../img/smart-assist-graphic.png';
import { smartAssistContent } from './NLData';
import NLSearchInfoSection from './NLSearchInfoSection';
import { stickyHeaderHeight } from 'dataMapping/stickyHeader/stickyHeader';
import NLSearchInfoResources from './NLSearchInfoResources';
// import NLSearchInfoSidebar from './NLSearchInfoSidebar';
import useJumpToSection from '../../../hooks/useJumpToSection';
import useQueryParams from '../../../hooks/useQueryParams';
import { FlexGridCol, Button } from 'data-transparency-ui';
import ShareDownloadButtonGroup from '../../sharedComponents/buttons/ShareDownloadButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, A11y, FreeMode } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css';

require('pages/search/naturalLanguage/searchInfoPage.scss');

const graphicLabel = (
    <>
        An <span style={{ color: '#0081a1', fontWeight: 600 }}>easy</span> way to search for government spending.
    </>
);

const infoSections = [
    {
        section: 'overview',
        label: 'Overview'
    },
    {
        section: 'searching-with-smart-assist',
        label: 'Searching With Smart Assist'
    },
    {
        section: 'understanding-results',
        label: 'Understanding Results'
    },
    {
        section: 'limitations',
        label: 'Limitations'
    },
    {
        section: 'feedback-and-support',
        label: 'Feedback & Support'
    }
];

const { overview, search, results, limitations, feedback } = smartAssistContent ?? {};

const accordionIdsForSection = (sectionKey, data) => (data?.items ?? []).map((_, i) => `${sectionKey}-${i}`);

const allAccordionIds = [
    ...accordionIdsForSection('overview', overview),
    ...accordionIdsForSection('search', search),
    ...accordionIdsForSection('results', results),
    ...accordionIdsForSection('limitations', limitations),
    ...accordionIdsForSection('feedback', feedback)
];

const NLSearchInfoPage = () => {
    const jumpToSection = useJumpToSection('#nlinfo-', infoSections, false, stickyHeaderHeight);
    const query = useQueryParams();
    const [activeSection] = useState(query.section || 'overview');
    const [openAccordions, setOpenAccordions] = useState({});

    const allExpanded = allAccordionIds.every((id) => openAccordions[id]);

    const handleAccordionToggle = useCallback((id, updater) => {
        setOpenAccordions((prev) => {
            const prevOpen = !!prev[id];
            const nextOpen = typeof updater === 'function' ? updater(prevOpen) : updater;
            return prevOpen === nextOpen ? prev : { ...prev, [id]: nextOpen };
        });
    }, []);

    const handleToggleAll = useCallback(() => {
        const nextOpen = !allExpanded;
        setOpenAccordions(allAccordionIds.reduce((acc, id) => {
            acc[id] = nextOpen;
            return acc;
        }, {}));
    }, [allExpanded]);

    return (
        <PageWrapper
            pageName="smart-assist"
            classNames="usa-smart-assist-page"
            metaTagProps={smartAssistPageMetaTags}
            title="Smart Assist">
            <main id="main-content" className="main-content">
                <BannerPageHeader
                    className="nl-search-container"
                    kicker="RESOURCES"
                    title="Smart Assist"
                    body="Get quick answers to your questions about our AI-powered Smart Assist feature"
                    faIcon="sparkles"
                    primaryColor="#0081a1"
                    secondaryColor="#0081a1"
                    overrideBackgroundColor="linear-gradient(91deg,#00687d 0%, #0081a1 35%, #005ea2 100%)" />
                <FlexGridCol className="search-info-page__download-group">
                    <ShareDownloadButtonGroup
                        url=""
                        showDownloadBtn
                        onDownloadClick={() => {}}
                        downloadInFlight={false}
                        downloadIcon="file-download"
                        onShareClick={() => {}}
                        keepShareText
                        className="blue-share" />
                </FlexGridCol>
                <section className="search-info-page__heading">
                    <div className="search-info-page__label">{graphicLabel}</div>
                    <div className="search-info-page__graphic-container">
                        <Swiper
                            slidesPerView="auto"
                            freeMode={{ enabled: true, momentum: false }}
                            keyboard
                            a11y
                            grabCursor
                            modules={[Keyboard, A11y, FreeMode]}
                            className="search-info-page__graphic-swiper">
                            <SwiperSlide className="search-info-page__graphic-slide">
                                <img
                                    src={smartAssistGraphic}
                                    alt="Smart Assist graphic" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </section>
                <section className="search-info-page__content-section">
                    <SideBarNav
                        sections={infoSections}
                        activeSection={activeSection}
                        pageName="nlinfo"
                        detectActiveSection
                        jumpToSection={jumpToSection} />
                    <div>
                        <FlexGridCol className="search-info-page__expand-all-btn">
                            <Button
                                copy={allExpanded ? 'Collapse all' : 'Expand all'}
                                onClick={handleToggleAll}
                                buttonTitle={allExpanded ? 'Collapse all' : 'Expand all'}
                                buttonSize="md"
                                buttonType="text"
                                backgroundColor="light"
                                textAlignment="center"
                                imageAlignment="left"
                                image={(
                                    <div className="button-icon-container">
                                        <FontAwesomeIcon
                                            className="button-icon"
                                            icon={allExpanded ? 'minus' : 'plus'} />
                                    </div>
                                )} />
                        </FlexGridCol>
                        <NLSearchInfoSection
                            anchor="nlinfo-overview"
                            section={overview}
                            sectionKey="overview"
                            openAccordions={openAccordions}
                            onToggle={handleAccordionToggle} />
                        <NLSearchInfoSection
                            anchor="nlinfo-searching-with-smart-assist"
                            section={search}
                            sectionKey="search"
                            openAccordions={openAccordions}
                            onToggle={handleAccordionToggle} />
                        <NLSearchInfoSection
                            anchor="nlinfo-understanding-results"
                            section={results}
                            sectionKey="results"
                            openAccordions={openAccordions}
                            onToggle={handleAccordionToggle} />
                        <NLSearchInfoSection
                            anchor="nlinfo-limitations"
                            section={limitations}
                            sectionKey="limitations"
                            openAccordions={openAccordions}
                            onToggle={handleAccordionToggle} />
                        <NLSearchInfoSection
                            anchor="nlinfo-feedback-and-support"
                            section={feedback}
                            sectionKey="feedback"
                            openAccordions={openAccordions}
                            onToggle={handleAccordionToggle} />
                    </div>
                </section>
                <NLSearchInfoResources />
            </main>
        </PageWrapper>
    );
};

export default NLSearchInfoPage;
