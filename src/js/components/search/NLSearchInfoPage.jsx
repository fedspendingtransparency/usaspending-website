/**
 * NLInfoPage.jsx
 * Created by Trey Morgan 09/24/2026
 */

import React from 'react';

import PageWrapper from "../sharedComponents/PageWrapper";
import BannerPageHeader from '../sharedComponents/header/BannerPageHeader';
import { smartAssistPageMetaTags } from '../../helpers/metaTagHelper';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import smartAssistGraphic from '../../../img/smart-assist-graphic.png';

require("pages/search/searchPage.scss");

const graphicLabel = (
    <>
        An <span style={{color: '#0081a1', fontWeight: 600}}>easy</span> way to search for government spending.
    </>
);

const NLSearchInfoPage = () => {
    return (
        <PageWrapper
            pageName="smart-assist"
            classNames="usa-da-search-page"
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
                    secondaryColor= "#0081a1"
                    overrideBackgroundColor="linear-gradient(91deg,#00687d 0%, #0081a1 35%, #005ea2 100%)"/>

                <section className="search-info-page__section">
                    <div className="search-info-page__label">{graphicLabel}</div>
                    <FlexGridRow className="search-info-page__row">
                        <img
                            src={smartAssistGraphic}
                            alt="Smart Assist graphic"/>
                    </FlexGridRow>
                </section>
                
            </main>
        </PageWrapper>
    )
}

export default NLSearchInfoPage;