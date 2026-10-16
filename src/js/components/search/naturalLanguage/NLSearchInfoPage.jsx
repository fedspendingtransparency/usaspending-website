/**
 * NLSearchInfoPage.jsx
 * Created by Trey Morgan 09/24/2026
 */

import React, { useState, useCallback } from 'react';
import PageWrapper from "../../sharedComponents/PageWrapper";
import BannerPageHeader from '../../sharedComponents/header/BannerPageHeader';
import { smartAssistPageMetaTags } from '../../../helpers/metaTagHelper';
import smartAssistGraphic from '../../../../img/smart-assist-graphic.png';
import { smartAssistContent } from '../naturalLanguage/NLData';
import NLSearchInfoSection from './NLSearchInfoSection';
import NLSearchInfoResources from './NLSearchInfoResources';
import { FlexGridCol, Button} from 'data-transparency-ui';
import ShareDownloadButtonGroup from '../../sharedComponents/buttons/ShareDownloadButtonGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, A11y, FreeMode } from 'swiper/modules';
import "swiper/css/bundle";
import "swiper/css";

require("pages/search/naturalLanguage/searchInfoPage.scss");

const graphicLabel = (
    <>
        An <span style={{ color: '#0081a1', fontWeight: 600 }}>easy</span> way to search for government spending.
    </>
);

const { overview, search, results, limitations, feedback } = smartAssistContent ?? {};

const NLSearchInfoPage = () => {
    const [toggleAllAccordions, setToggleAllAccordions] = useState({ trigger: 0, expand: false });
    const [openAccordions, setOpenAccordions] = useState({});

    const accordionIds = Object.keys(openAccordions);
    const allExpanded = accordionIds.length > 0 && accordionIds.every((accordionId) => openAccordions[accordionId]);

    const handleAccordionToggle = useCallback((id, isOpen) => {
        setOpenAccordions((prev) => (prev[id] === isOpen ? prev : { ...prev, [id]: isOpen }));
    }, []);

    const handleToggleAll = () => {
        setToggleAllAccordions((prev) => ({ trigger: prev.trigger + 1, expand: !allExpanded }));
    };

    return (
        <PageWrapper
            pageName="smart-assist"
            classNames="usa-smart-assist-page"
            metaTagProps={smartAssistPageMetaTags}
            title="Smart Assist"
            noHeader>
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
                        image={
                            <div className="button-icon-container">
                                <FontAwesomeIcon
                                    className="button-icon"
                                    icon={allExpanded ? 'minus' : 'plus'} />
                            </div>
                        }/>
                </FlexGridCol>
                <section className="search-info-page__content-section">
                    <NLSearchInfoSection
                        section={ overview }
                        sectionKey="overview"
                        toggleAll={toggleAllAccordions}
                        onToggle={handleAccordionToggle} />
                    <NLSearchInfoSection
                        section={ search }
                        sectionKey="search"
                        toggleAll={toggleAllAccordions}
                        onToggle={handleAccordionToggle} />
                    <NLSearchInfoSection
                        section={ results }
                        sectionKey="results"
                        toggleAll={toggleAllAccordions}
                        onToggle={handleAccordionToggle} />
                    <NLSearchInfoSection
                        section={ limitations }
                        sectionKey="limitations"
                        toggleAll={toggleAllAccordions}
                        onToggle={handleAccordionToggle} />
                    <NLSearchInfoSection
                        section={ feedback }
                        sectionKey="feedback"
                        toggleAll={toggleAllAccordions}
                        onToggle={handleAccordionToggle} />
                </section>
                <NLSearchInfoResources />
            </main>
        </PageWrapper>
    );
};

export default NLSearchInfoPage;
