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

const {
    overview,
    search,
    results,
    limitations,
    feedback
} = smartAssistContent ?? {};

const infoSections = [
    {
        section: 'overview',
        label: 'Overview',
        sectionKey: 'overview',
        data: overview
    },
    {
        section: 'searching-with-smart-assist',
        label: 'Searching With Smart Assist',
        sectionKey: 'search',
        data: search
    },
    {
        section: 'understanding-results',
        label: 'Understanding Results',
        sectionKey: 'results',
        data: results
    },
    {
        section: 'limitations',
        label: 'Limitations',
        sectionKey: 'limitations',
        data: limitations
    },
    {
        section: 'feedback-and-support',
        label: 'Feedback & Support',
        sectionKey: 'feedback',
        data: feedback
    }
];

const accordionIdsForSection = (sectionKey, data) => (data?.items ?? []).map((_, i) => `${sectionKey}-${i}`);

// nav section slug -> accordion ids in that section
const accordionIdsBySection = Object.fromEntries(
    infoSections.map(({ section, sectionKey, data }) => [section, accordionIdsForSection(sectionKey, data)])
);

const allAccordionIds = Object.values(accordionIdsBySection).flat();

const withOpen = (prev, ids = []) => ({ ...prev, ...Object.fromEntries(ids.map((id) => [id, true])) });

const NLSearchInfoPage = () => {
    const jumpToSection = useJumpToSection('#nlinfo-', infoSections, false, stickyHeaderHeight);
    const query = useQueryParams();
    const [activeSection] = useState(query.section || 'overview');
    // lazy initializer so a deep link (?section=...) opens that section on first render,
    // since useJumpToSection's initial scroll bypasses handleJumpToSection
    const [openAccordions, setOpenAccordions] = useState(
        () => withOpen({}, accordionIdsBySection[query.section])
    );

    const openSection = useCallback((section) => {
        const ids = accordionIdsBySection[section];
        if (!ids?.length) return;
        setOpenAccordions((prev) => withOpen(prev, ids));
    }, []);

    const handleJumpToSection = useCallback((section) => {
        openSection(section);
        return jumpToSection(section);
    }, [openSection, jumpToSection]);

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
                        jumpToSection={handleJumpToSection} />
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
                        {infoSections.map(({ section, sectionKey, data }) => (
                            <NLSearchInfoSection
                                key={section}
                                anchor={`nlinfo-${section}`}
                                section={data}
                                sectionKey={sectionKey}
                                openAccordions={openAccordions}
                                onToggle={handleAccordionToggle} />
                        ))}
                    </div>
                </section>
                <NLSearchInfoResources />
            </main>
        </PageWrapper>
    );
};

export default NLSearchInfoPage;
