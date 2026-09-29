/* eslint-disable react/no-array-index-key */
/**
 * NLInfoPage.jsx
 * Created by Trey Morgan 09/24/2026
 */

import React from 'react';
import PageWrapper from "../../sharedComponents/PageWrapper";
import BannerPageHeader from '../../sharedComponents/header/BannerPageHeader';
import Accordion from '../../sharedComponents/accordion/Accordion';
import { smartAssistPageMetaTags } from '../../../helpers/metaTagHelper';
import { FlexGridCol } from 'data-transparency-ui';
import smartAssistGraphic from '../../../../img/smart-assist-graphic.png';
import { smartAssistContent } from '../naturalLanguage/NLData';

require("pages/search/naturalLanguage/searchInfoPage.scss");

const graphicLabel = (
    <>
        An <span style={{color: '#0081a1', fontWeight: 600}}>easy</span> way to search for government spending.
    </>
);

const { overview, search, results, limitations, feedback } = smartAssistContent ?? {};

const NLSearchInfoPage = () => {
    console.log({overview, search, results, limitations, feedback});

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
                    secondaryColor= "#0081a1"
                    overrideBackgroundColor="linear-gradient(91deg,#00687d 0%, #0081a1 35%, #005ea2 100%)"/>
                <section className="search-info-page__heading">
                    <div className="search-info-page__label">{graphicLabel}</div>
                    <div className="search-info-page__graphic-container">
                        <img
                            src={smartAssistGraphic}
                            alt="Smart Assist graphic"/>
                    </div>
                </section>
                <section className='search-info-page__content-section'>
                    <div className="search-info-page__heading-section">
                        <FlexGridCol
                            className="search-info-page__content-col"
                            desktop={{ span: 9, offset: 3 }}
                            tablet={12}
                            mobile={12}>
                            <h3 className="search-info-page__top-content-heading">
                                {overview.heading}
                            </h3>
                        </FlexGridCol>
                    </div>
                    <div className="search-info-page__accordion-section">
                        <FlexGridCol
                            className="search-info-page__accordion-list"
                            desktop={{ span: 9, offset: 3 }}
                            tablet={12}
                            mobile={12}>
                            {overview.items.map((item, i) => (
                                <Accordion
                                    containerClassName="search-info-page-container"
                                    headingClassName="search-info-page-heading"
                                    contentClassName="search-info-page-content"
                                    faClassName="search-info-page-fa"
                                    aria-label="Toggle Expansion"
                                    aria-expanded="false"
                                    key={`item-${i}`}
                                    title={item.title}>
                                    {item.content}
                                </Accordion>
                            ))}
                        </FlexGridCol>
                    </div>
                </section>
            </main>
        </PageWrapper>
    )
}

export default NLSearchInfoPage;
