/**
 * FeaturedContentPage.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ComingSoon } from "data-transparency-ui";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import PageWrapper from "../sharedComponents/PageWrapper";
import ContentPageHeader from '../sharedComponents/header/ContentPageHeader';


require('pages/contentPage/contentPage.scss');

const FeaturedContentPage = () => (
    <PageWrapper
        pageName="Featured Content"
        classNames="content-page"
        noHeader
        metaTagProps={{ ...homePageMetaTags }}>
        <main
            id="main-content"
            className="main-content content-page">
            <ContentPageHeader
                className="content-page-header"
                kicker="RESOURCES"
                title="Featured Content"
                body="Read the latest featured content to learn more about government spending."
                image="img/contentPage/featured-content-landing-page-banner-2x.webp"
                slug="featured-content" />

            <ComingSoon />
        </main>
    </PageWrapper>);

export default FeaturedContentPage;
