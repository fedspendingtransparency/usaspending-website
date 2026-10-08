/**
 * NLSearchInfoPage.jsx
 * Created by Trey Morgan 09/24/2026
 */

import React from 'react';
import PageWrapper from "../../sharedComponents/PageWrapper";
import BannerPageHeader from '../../sharedComponents/header/BannerPageHeader';
import { smartAssistPageMetaTags } from '../../../helpers/metaTagHelper';
import smartAssistGraphic from '../../../../img/smart-assist-graphic.png';
import { smartAssistContent } from '../naturalLanguage/NLData';
import NLSearchInfoSection from './NLSearchInfoSection';
import NLSearchInfoResources from './NLSearchInfoResources';
import { FlexGridCol } from 'data-transparency-ui';
import ShareDownloadButtonGroup from '../../sharedComponents/buttons/ShareDownloadButtonGroup';

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
                        url={''}
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
                    <NLSearchInfoSection section={overview} />
                    <NLSearchInfoSection section={search} />
                    <NLSearchInfoSection section={results} />
                    <NLSearchInfoSection section={limitations} />
                    <NLSearchInfoSection section={feedback} />
                </section>
                <NLSearchInfoResources />
            </main>
        </PageWrapper>
    );
};

export default NLSearchInfoPage;
